import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app=express();

app.use(express.json());

app.use("/api",routes);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    mongoose.connect(process.env.DB ?? "")
    .then(mongoose=>{
        console.log("db");
    });
    console.log("start");
})