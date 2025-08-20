import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT;
const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));


app.listen(port ,()=>{
    console.log(`server is running on ${port}`)
})