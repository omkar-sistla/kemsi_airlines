import express from "express";
import { get2Flights,get3Flights } from "../controllers/flights.js";
export const oneStopFlight = express.Router();
oneStopFlight.get("/",get2Flights);
export const twoStopFlight = express.Router();
twoStopFlight.get("/",get3Flights);