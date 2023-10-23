import express from "express";
import dotenv from 'dotenv';
const env = dotenv.config();
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser"

import flights from "./routes/flighttest.js";
import  {registerRoute,loginRoute,logoutRoute,authorizeRoute} from "./routes/auth.js";
import { upcomingBookingsRoute,completedBookingsRoute, cancelledBookingsRoute,bookingDetailsRoute, cancelBookingRoute } from "./routes/bookings.js";
import { bookJourneyRoute } from "./routes/book_a_journey.js";
app.use(cors({
    origin:"http://localhost:3001",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/flights",flights);
app.use("/register",registerRoute);
app.use("/login",loginRoute);
app.use("/logout",logoutRoute);
app.use("/bookings",upcomingBookingsRoute);
app.use("/bookings",completedBookingsRoute);
app.use("/bookings",cancelledBookingsRoute)
app.use("/bookings",bookingDetailsRoute);
app.use("/bookings",cancelBookingRoute);
app.use("/book",bookJourneyRoute);

app.use("/",authorizeRoute);
// app.use("/flights",twoStopFlight);
const PORT = process.env.PORT
app.listen(PORT,()=> {
    console.log(`server is running at port ${PORT}`);
});
