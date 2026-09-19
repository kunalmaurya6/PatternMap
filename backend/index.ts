import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

const app=express();

app.use(express.json());

app.use(cors())

app.use("/api",routes);

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