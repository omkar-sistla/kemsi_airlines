import React from "react";
import './flights.css'
import { bookingValuesExport } from "../components/booking/booking";
var test = bookingValuesExport;
export default function Flights(){
    window.scrollTo(0,0);
    function getRandomNumberInRange(min, max) {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        return number.toLocaleString('en-IN');
    }
    return(
        <div className="flights_page">
            <div className="flight">
                <div className="flightdetails">
                    <div className="fromside">
                        <p className="date">{bookingValuesExport.depart}</p>
                        <p className="time">08:20</p>
                        <p className="airport">{bookingValuesExport.from.slice(-4,-1)}</p>
                    </div>
                    <div className="middlepart">
                        <div className="dottedline"></div>
                        <p className="duration">1hr56min</p>
                        <div className="dottedline"></div>
                    </div>

                    <div className="toside">
                        <p className="date">{bookingValuesExport.depart}</p>              
                        <p className="time">10:16</p>
                        <p className="airport">{bookingValuesExport.to.slice(-4,-1)}</p>
                    </div>
                </div>
                <div className="faredetails">
                    <p>{bookingValuesExport.class}</p>
                    <p>{bookingValuesExport.class === "Business Class" && "INR "+getRandomNumberInRange(20000,24000)}
                    {bookingValuesExport.class === "Economy" && "INR "+getRandomNumberInRange(3600,5800)}
                    {bookingValuesExport.class === "First Class" && "INR "+getRandomNumberInRange(36000,42000)}</p>
                </div>          
            </div>
        </div>

    )
}