import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import pg from "pg";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";


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



app.use("/users",userRouter);
app.use("/captains",captainRouter);


app.get("/", async (req, res)=>{
    res.send("Hello world!");
});


app.listen(port ,()=>{
    console.log(`server is running on ${port}`)
})