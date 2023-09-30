import express from "express";
import { register,login } from "../controllers/auth.js";
export const registerRoute = express.Router();
registerRoute.post("/",register);
export const loginRoute = express.Router();
loginRoute.post("/",login);
