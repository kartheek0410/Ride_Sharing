import pg from "pg";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

const saltRounds =10;

const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER,
});


db.connect();

export const signup = async (req,res)=>{
    let {firstName , lastName,email,password} = req.body;
    try{
        if(password.length<6){
            return res.status(400).json({message : "password must be atleast 6 characters"});
        }

        const result  = await db.query("select * from users where email=$1",[email]);
        if(result.rows.length > 0){
            return res.status(400).json({message : "Email already exists"});
        }

        bcrypt.hash(password,saltRounds,async(err,hash)=>{
            if(err){
                return res.status(500).json({message:"error in hashing the password"});
            }

            let result1 = await db.query("insert into users (email,firstname,password,lastname) values($1,$2,$3,$4) returning *",[email,firstName,hash,lastName]);
            generateToken(result1.rows[0].id,res);
            return res.status(200).json({
                id : result1.rows[0].id,
                firstName : result1.rows[0].firstname,
                lastName : result1.rows[0].lastname,
                email : result1.rows[0].email,
            });

        });


    }catch(err){
        console.log("error in signup controller ",err.message);
        return res.status(500).json({message:"internal server Error"});
    }
};


export  async function login(req,res){

    let {email,password} = req.body;
    try{
        const result  = await db.query("select * from users where email = $1",[email]);
    

        if(result.rows.length ===0){
            return res.status(400).json({message : "User not exits signup or invalid credentials"});
        }
        bcrypt.compare(password,result.rows[0].password, (err,same)=>{
            if(err){
                console.log(err.message);
                return res.status(500).json({message : "Internal server error in comparing passwords"});
            }
            if(!same){
                console.log(same);
                return res.status(400).json({message: "Invalid credentials"});
            }

            generateToken(result.rows[0].id,res);
            return res.status(200).json({
                user: result.rows[0]
            });
        })
    }catch(err){
        console.log("error in login controller",err.message);
        res.status(500).json({message : "internal server error in login controller"});
    }

}

export  function logout(req,res){
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out Succesfully"});

    }catch(err){
        console.log("error in logging out",err.message);
        res.status(500).json({message:"Internal server error"});

    }
}


export async function checkAuth(req,res){
    try{
        res.status(200).json(req.user);
    }catch(err){
        res.status(500).json({message: "Internal Server Error in checkAuth"});
    }
}