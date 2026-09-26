import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authentication from "./routes/authentication/index.js";

const app = express();

app.get("/api/health",(_,res)=>{
    res.status(200).json({
        health_status:"healthy"
    });
})

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api", authentication);

const PORT = Number(process.env.PORT) || 5000;

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500).json({
        message: "Internal Server Error"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    mongoose.connect(process.env.DB!)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.error("DB connection failed:", err);
        });

    console.log(`Server running on port ${PORT}`);
});