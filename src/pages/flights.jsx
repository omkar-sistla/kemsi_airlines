import React from "react";
import './flights.css'
import { bookingValuesExport } from "../components/booking/booking";
var test = bookingValuesExport;
export default function Flights(){
    return(
        <div className="flight">
            <div className="flightdetails">
                <div className="fromside">
                    <p className="date">{bookingValuesExport.depart}</p>
                    <p className="time">08:20</p>
                    <p className="airport">{bookingValuesExport.from.slice(-4,-1)}</p>
                </div>
                <p className="duration">..........1hr56min..........</p>
                <div className="toside">
                    <p className="date">{bookingValuesExport.depart}</p>              
                    <p className="time">10:16</p>
                    <p className="airport">{bookingValuesExport.to.slice(-4,-1)}</p>
                </div>
            </div>
            <div className="faredetails">
                 <p>{bookingValuesExport.class}</p>
                 <p>{bookingValuesExport.class === "Business Class" && "Rs 24000"}
                 {bookingValuesExport.class === "Economy" && "Rs 4500"}
                 {bookingValuesExport.class === "First Class" && "Rs 6969"}</p>
            </div>          
        </div>
    )
}