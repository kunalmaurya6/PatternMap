import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { authMiddleware } from './routes/authentication/index.js';
import authentication from "./routes/authentication/index.js"

const app=express();

app.use(express.json());

app.use(cookieParser());

app.use(cors(
    {
    origin: "http://localhost:5173",
    credentials: true
    }
))

app.use("/api",authentication,authMiddleware);


const PORT=process.env.PORT;

// Global error handler
app.use((err:any, re:any, res:any, next:any) => {
    res.status(err.status || 500).json({
        message: "Internal Server Error"
    });
});

app.listen(PORT,()=>{
    mongoose.connect(process.env.DB!)
    .then(mongoose=>{
        console.log("db");
    });
    console.log("start");
})