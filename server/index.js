import express from "express";
const app = express();
import userRoute from "./routes/users.js";
import flights from "./routes/flighttest.js";
import  {registerRoute,loginRoute} from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser"
app.use(express.json());
app.use("/users",userRoute);
app.use("/flights",flights);
app.use("/register",registerRoute);
app.use("/login",loginRoute);
// app.use("/flights",twoStopFlight);
app.listen(3000,()=> {
    console.log(`server is running at port ${3000}`);
});
