import { Router } from "express";
import authentication from "./authentication/index.js"
const routes=Router();

// routes.get("/",(req,res,next)=>{
//     res.send("Successfull");
//     next();
// })
routes.use("/auth",authentication);

export default routes;