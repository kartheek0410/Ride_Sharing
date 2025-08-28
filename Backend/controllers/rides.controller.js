import pg from "pg";

const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER,
});

db.connect();



export const createRide = async(req,res)=>{
    const {pickup,destination,type,fare } = req.body;
    
    // console.log(pickup,destination,type,fare );

    if(!pickup || !destination || !type){
        return res.json({"Error" : "All Fields are required"});
    }

    try{
        const userid = req.user.id;
        const otp = Math.floor(Math.random()*900000 + 100000);
        let result = await db.query("insert into rides (userid,pickup,destination,fare,otp) values ($1,$2,$3,$4,$5) returning *",[userid,pickup,destination,fare,otp]);
        // console.log(result);
        return res.send(result.rows[0]);
    }catch(err){
        console.log(err.message);
        return res.status(404).json({"Error": err.message});
    }

}