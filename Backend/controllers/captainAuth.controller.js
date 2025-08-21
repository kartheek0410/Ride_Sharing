import pg from "pg";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";


const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER,
});

db.connect();

export const  signup= async (req, res)=> {
    
    let {firstName, lastName, email, password,status,vehiclecolor,vehicleplate,vehiclecapacity,vehicletype,lattitude,longitude} = req.body;
    // console.log(firstName, lastName, email, password,status,vehiclecolor,vehicleplate,vehiclecapacity,vehicletype,lattitude,longitude)
    try{
        if(!firstName || !lastName || !email || !password || !vehiclecolor || !vehicleplate || !vehiclecapacity || !vehicletype ){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const result = await db.query("SELECT * FROM captains WHERE email = $1", [email]);

        if(result.rows.length > 0){
            return res.status(400).json({message: "Captain with this email already exists"});
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err){
                console.log("Error in hashing password: ", err.message);
                return res.status(500).json({message: "Internal Server Error"});
            }
            
            let result1 = await db.query("INSERT INTO captains (firstname, lastname, email, password, status, vehiclecolor, vehicleplate, vehiclecapacity, vehicletype, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", 
            [firstName, lastName, email, hash, status , vehiclecolor, vehicleplate, vehiclecapacity, vehicletype,lattitude ,longitude ]);
                
            generateToken(result1.rows[0].id,res);
                
            res.status(201).json(result1.rows[0]);
           
        });
    }catch(err) {
        console.log("Error in captain signup controller: ", err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}
export async function login(req,res){
    let {email,password} = req.body;
    try{
        const result  = await db.query("select * from captains where email = $1",[email]);
        
        if(result.rows.length === 0){
            return res.status(400).json({message : "Captain not found"});
        }

        bcrypt.compare(password, result.rows[0].password, (err , same)=>{
            if(err){
                console.log("Error in comparing password: ", err.message);
                return res.status(500).json({message: "Internal Server Error"});
            }
            if(!same){
                return res.status(400).json({message: "Invalid credentials"});
            }

            generateToken(result.rows[0].id, res);
            return res.status(200).json(result.rows[0]);
        })
    }catch(err){
        console.log("Error in captain login controller: ", err.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export async function logout(req,res){
    try{
        res.cookie("jwt", "",{maxAge: 0});
        return res.status(200).json({message: "Logged out successfully"});
    }catch(err){
        console.log("Error in captain logout controller: ", err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function checkAuth(req,res){
    try{
        return res.status(200).json(req.user);
    }catch(err){
        console.log("Error in captain checkAuth controller: ", err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}