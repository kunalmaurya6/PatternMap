import mongoose from "mongoose";
import { Router } from "express";

const router=Router();

router.post("/",(req,res)=>{
    const user=req.body;
    if(user.userName==="kunal"){
        res.send(user);
    }else{
        res.send("kunal");
    }
})

export default router;