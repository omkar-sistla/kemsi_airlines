import express from "express";
import { register,login,logout,verifyUser} from "../controllers/auth.js";
export const registerRoute = express.Router();
registerRoute.post("/",register);
export const loginRoute = express.Router();
loginRoute.post("/",login);
export const logoutRoute = express.Router();
logoutRoute.post("/",logout);
export const authorizeRoute = express.Router();
authorizeRoute.get("/",verifyUser, (req,res)=>{
    return res.json({Status:"Success", user:req.user})
});
