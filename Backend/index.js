import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import http from "http";
import {initializeSocket} from "./socket.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import pg from "pg";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import mapRouter from "./routes/maps.routes.js";
import rideRouter from "./routes/rides.routes.js";
import { aj }  from "./lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

const server = http.createServer(app); 

initializeSocket(server);

const port = process.env.PORT;



app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER
});

db.connect().then(()=>{
    console.log("connected to DB");
}).catch(err=> console.log(err));

app.use(async (req,res,next)=>{
    try{
        const decision  = await aj.protect(req,{requested : 1}); // each request costs 1 token
        console.log("Arcjet decision", decision);
        
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).send("Too many requests - try again later");
            }else if(decision.reason.isBot()){
                res.status(403).send("Bots are not allowed");
            }else{
                res.status(403).send("Access denied");
            }

            return;
        }

        if(decision.results.some((result) =>  result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).send("Spoofed bots are not allowed");
            return;
        }

        next();
    }catch(err){
        console.log(err);
        res.status(500).send("arcjet :Internal server error");
        next(err);
    }
});


app.use("/users",userRouter);
app.use("/captains",captainRouter);
app.use("/maps",mapRouter);
app.use("/rides",rideRouter);


app.get("/", async (req, res) => {
    res.send("Hello world!");
});

// start server with socket.io attached
server.listen(port, () => {
    console.log(`server is running on ${port}`);
});
