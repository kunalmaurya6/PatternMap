import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app=express();

app.use(express.json());

app.use("/api",routes);

const PORT=process.env.PORT;

// Global error handler
app.use((err:any, re:any, res:any, next:any) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

app.listen(PORT,()=>{
    mongoose.connect(process.env.DB!)
    .then(mongoose=>{
        console.log("db");
    });
    console.log("start");
})