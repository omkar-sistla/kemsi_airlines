import express from "express";
import { getCompletedBookings, getUpcomingBookings,getBookingDetails, getCancelledBookings, cancelBookings } from "../controllers/bookings.js";
export const upcomingBookingsRoute = express.Router();
upcomingBookingsRoute.post("/upcoming-journeys",getUpcomingBookings);
export const completedBookingsRoute = express.Router();
completedBookingsRoute.post("/completed-journeys", getCompletedBookings);
export const cancelledBookingsRoute = express.Router();
cancelledBookingsRoute.post("/cancelled-journeys", getCancelledBookings);
export const bookingDetailsRoute = express.Router();
bookingDetailsRoute.post("/ticket",getBookingDetails);
export const cancelBookingRoute = express.Router();
cancelBookingRoute.patch("/:cancel-journey",cancelBookings);
