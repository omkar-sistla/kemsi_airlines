import express from "express";
import { bookJourney } from "../controllers/book_a_journey.js";
export const bookJourneyRoute = express.Router();
bookJourneyRoute.post("/",bookJourney);
