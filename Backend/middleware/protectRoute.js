import jwt from "jsonwebtoken";
import pg from "pg";

const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER,
});

const JWT_SECRET = process.env.SECRET;

db.connect();


export async function protectRoute(req,res,next){
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message : "Unauthorized - No Token Provided"});
        }

        const decode = jwt.verify(token,JWT_SECRET);

        if(!decode){
            return res.status(401).json({message :"Unauthorized- Invalid Token"});
        }
        // console.log(decode);

        const result = await db.query("select * from users where id =$1",[decode.userId]);
        const user = result.rows;
        if(user.length === 0){
            return res.status(404).json({message : "User not found"});
        }
        req.user = user[0];
        next();
    }catch(err){
        console.log("Error in protectRoute middleware: ",err.message);
    }
}