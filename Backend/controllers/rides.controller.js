import pg from "pg";
import {getCoordinates} from "../controllers/map.controller.js";
import {sendMessageToSocketId} from "../socket.js"

const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    user: process.env.USER,
});

db.connect();

export const getCaptainInTheRadius = async (latitude, longitude, radius) => {
    try {
       const query = `
            SELECT * FROM captains
            WHERE ST_DWithin(
                ST_SetSRID(ST_MakePoint(CAST(longitude AS NUMERIC), CAST(latitude AS NUMERIC)), 4326),
                ST_SetSRID(ST_MakePoint($2, $1), 4326),
                $3
            )`;

        const result = await db.query(query, [latitude, longitude, radius]);
        return result.rows;
    } catch (error) {
        console.error('Error finding captains:', error);
        throw error;
    }
};

export const createRide = async (req, res) => {
    const { pickup, destination, vehicleType, fare } = req.body;

    if (!pickup || !destination || !vehicleType) {
        return res.json({ "Error": "All Fields are required" });
    }

    // console.log(pickup,destination,fare,vehicleType);


    try{

        const userid = req.user.id;
        const otp = Math.floor(Math.random() * 900000 + 100000);

        let result = await db.query("insert into rides (userid, pickup, destination, fare, otp) values ($1, $2, $3, $4, $5) returning *", [userid, pickup, destination, fare, otp]);
        res.status(200).json(result.rows[0]);
        
        const pickupcord = await getCoordinates({ body: { address: pickup } }, res);


        if (pickupcord.error) {
            return res.status(400).json({ error: pickupcord.error });
        }
    

        const captainsInTheRadius = await getCaptainInTheRadius(pickupcord.latitude, pickupcord.longitude, 2000);

        result.rows[0].otp= null;

        const udata = await db.query("select * from users where id = $1",[result.rows[0].userid]);
        const userdata = udata.rows[0];
        const data = {
            ...result.rows[0],
            userinfo: userdata
        }

        captainsInTheRadius.map(async captain =>{

            // console.log("captain:" ,captain,"ride info: ",result.rows[0]);

            sendMessageToSocketId(captain.socketid ,{
                event: 'new-ride',
                data : data
            });


        });


        return ;


    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ "Error": err.message });
    }
};


export const confirmRide = async(req,res)=>{
    const{rideid , captainid} = req.body;
    try{

    // console.log("data getting in ride controller",rideid,captainid);

    

    const captainres = await db.query("SELECT * FROM captains WHERE id = $1", [captainid]);
    if (captainres.rows.length === 0) {
        return res.status(404).json({ "Error": "Captain not found" });
    }
    const captain = captainres.rows[0];
    // console.log(captain);

    const updateRide = await db.query(
        "UPDATE rides SET captainid = $1, status = 'accepted', vehicletype = $2 WHERE id = $3 RETURNING *",
        [captain.id, captain.vehicletype, rideid]
    );

    if (updateRide.rows.length === 0) {
        return res.status(404).json({ "Error": "Ride not found" });
    }
    const userid = updateRide.rows[0].userid;

    const userRes = await db.query("SELECT * FROM users WHERE id = $1", [userid]);

    if (userRes.rows.length === 0) {
        return res.status(404).json({ "Error": "User not found" });
    }
    const userSocketId = userRes.rows[0].socketid;

    const responseData = {
        ...updateRide.rows[0],
        userinfo: userRes.rows[0],
        captaininfo: captain
    };

    sendMessageToSocketId(userSocketId,{
        event : 'ride-confirmed',
        data: responseData
    })

    return res.status(200).json(updateRide.rows[0]);



    }catch(err){
        console.log("error in confirm ride controller" , err.message);
        return res.status(400).json("Error" , err.message);
    }

}

export const startRide = async(req,res) => {
    const {ride, otp} = req.body;

    // console.log(otp);
    
    if (!ride || !otp) {
        return res.status(400).json({ "Error": "Ride ID and OTP are required" });
    }


    try {

        const rideres = await db.query("select * from rides where id =$1",[ride.id]);
        
        if (rideres.rows.length === 0) {
            return res.status(404).json({ "Error": "Ride not found" });
        }

        const updateride = {
           ...rideres.rows[0],
           userinfo : ride.userinfo
        }

        // console.log(updateride.otp);


        if(updateride.otp !== parseInt(otp, 10)){
            return res.status(400).json({"Error": "Incorrect OTP"});
        }

        const updateRide = await db.query(
            "UPDATE rides SET status = 'ongoing' WHERE id = $1 RETURNING *",
            [updateride.id]
        );

        if (updateRide.rows.length === 0) {
            return res.status(404).json({ "Error": "Failed to update ride status" });
        }

      

        sendMessageToSocketId(updateride.userinfo.socketid, {
            event: 'ride-started',
            data: updateride
        });

        return res.status(200).json(updateride);

    } catch(err) {
        console.log("error in start ride in ride controller", err.message);
        return res.status(500).json({ "Error": err.message });
    }
}

export const endRide = async(req,res)=>{
    const {rideid , ride} = req.body;

    if (!rideid || !ride) {
        return res.status(400).json({ "Error": "Ride details are required" });
    }

    try {
        const rideres = await db.query("SELECT * FROM rides WHERE id = $1", [rideid]);
        if (rideres.rows.length === 0) {
            return res.status(404).json({ "Error": "Ride not found" });
        }

        const Ride = rideres.rows[0];

        if(Ride.status !== 'ongoing'){
            return res.status(400).json({ "Error": "Ride is not ongoing" });
        }
        

        if (Ride.captainid !== req.captain.id) {
            return res.status(403).json({ "Error": "Not authorized to end this ride" });
        }

        const updateRide = await db.query(
            "UPDATE rides SET status = 'completed' WHERE id = $1 RETURNING *",
            [Ride.id]
        );

        if (updateRide.rows.length === 0) {
            return res.status(404).json({ "Error": "Failed to update ride status" });
        }
      

        sendMessageToSocketId(ride.userinfo.socketid, {
            event: 'ride-ended',
            data: updateRide.rows[0]
        });

        return res.status(200).json(updateRide.rows[0]);

    } catch(err) {
        console.log("error in end ride controller", err.message);
        return res.status(500).json({ "Error": err.message });
    }
}