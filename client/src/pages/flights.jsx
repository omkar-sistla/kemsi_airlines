import React from "react";
import './flights.css'
import { useState } from "react";
import { bookingValuesExport } from "../components/booking/booking";
import flight_data from "../jsons/flight_data.json";
import airport_data from "../jsons/airport_info.json"
import { Link } from "react-router-dom";
function checkflightdata(){
    if (bookingValuesExport.from==="" || bookingValuesExport.to===""){
        return false
    }
    return true
}
function getRandomNumberInRange(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toLocaleString('en-IN');
}
function possibleToCatch(currentFlight, nextFlight, flightDuration) {
    const currentFlightTime = parseTime(currentFlight);
    const nextFlightTime = parseTime(nextFlight);
    const flightDurationMinutes = parseFlightDuration(flightDuration);
    const waitingPeriodMinutes = 60;
    const currentFlightEndTime = new Date(currentFlightTime.getTime() + flightDurationMinutes * 60 * 1000 + waitingPeriodMinutes * 60 * 1000);
    return currentFlightEndTime <= nextFlightTime;
}
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes);
}
function parseFlightDuration(durationString) {
    const hoursMatch = durationString.match(/(\d+)h/);
    const minutesMatch = durationString.match(/(\d+)min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
}
function calculateTotalDuration(time1, time2, durationString) {
    const durationMinutes = parseFlightDuration(durationString);
    const date1 = parseTime(time1);
    const date2 = parseTime(time2);
    const totalTimeMinutes = (date2 - date1) / (1000 * 60) + durationMinutes;
    const hours = Math.floor(totalTimeMinutes / 60);
    const minutes = totalTimeMinutes % 60;

    return `${hours !==0 ? hours+"h" : ""} ${minutes}min`;
}
function calculateLayoff(time1,time2){
    const date1 = parseTime(time1);
    const date2 = parseTime(time2);
    const totalTimeMinutes = (date2 - date1) / (1000 * 60);
    const hours = Math.floor(totalTimeMinutes / 60);
    const minutes = totalTimeMinutes % 60;
    return `${hours !==0 ? hours+"h" : ""} ${minutes}min`;
}
function calculateNewTime(time, durationString) {
    const durationMinutes = parseFlightDuration(durationString);
    const date = parseTime(time);
    const newTime = new Date(date.getTime() + durationMinutes * 60 * 1000);
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
}
function findRoutesWithMaxStops(startCity, endCity) {
    const maxStops = 3;
    const routes = [];
    function dfs(currentCity, stops, currentRoute) {
        if (stops > maxStops) {
            return;
        }
        if (currentCity === endCity) {
            routes.push([...currentRoute]);
            return;
        }
        const destinations = flight_data[currentCity] || {};
        for (const destination in destinations) {
            if (destination === startCity) {
                continue;
            }
            const flights = destinations[destination];

            for (const flight of flights) {
                const { flight_number, departure_time, flight_duration } = flight;

                if (currentRoute.length === 0) {
                    currentRoute.push({ city: destination, flight_number, time: departure_time, flight_duration });
                } else if (possibleToCatch(currentRoute[currentRoute.length - 1].time, departure_time, flight_duration)) {
                    currentRoute.push({ city: destination, flight_number, time: departure_time, flight_duration });
                } else {
                    continue;
                }
                dfs(destination, stops + 1, currentRoute);
                if (currentRoute.length > 0) {
                    currentRoute.pop();
                }
            }
        }
    }
    dfs(startCity, 0, []);
    return routes;
}
function createFlightNumbers(flight_number){
    return(
        <p key={flight_number} className="flight_number">{flight_number}</p>
    )
}
function Flight(props){
    const [viewActive, setViewActive] = useState(false);
    const  toggleView = () =>{
        setViewActive(!viewActive);
    }
    return(
        <div className="flight_card">
            <div className="flight">
                <div className="flight_numbers">
                    <span className="material-symbols-outlined">
                        flightsmode
                    </span>
                    {props.flight_numbers.map(createFlightNumbers)}
                </div>
                <div className="flightdetails_section">
                    <div className="flightdetails">
                        <div className="fromside">
                            <p className="date">{props.depart}</p>
                            <p className="time">{props.departtime}</p>
                            <p className="airport">{props.from.slice(-4,-1)}</p>
                        </div>
                        <div className="middlepart">
                            <p className="duration">{props.duration}</p>
                            <p className="stops">{props.stops}</p>
                        </div>
                        <div className="toside">
                            <p className="date">{props.depart}</p>              
                            <p className="time">{props.arrivaltime}</p>
                            <p className="airport">{props.to.slice(-4,-1)}</p>
                        </div>
                    </div>
                    <p className="view" onClick={toggleView}>VIEW FLIGHT DETAILS <i className={!viewActive ?"fa-solid fa-angle-down":"fa-solid fa-angle-up"}></i></p>
                </div>
                <div className="faredetails">
                    <p className="class">{props.class}</p>
                    <p className="tag">Your price starts from</p>
                    <p className="inr">INR</p>
                    <p className="price">{props.class === "Business Class" && "23,568"}
                    {props.class === "Economy" && "4,893"}
                    {props.class === "First Class" && "41,258"}</p>
                </div>      
            </div>
            <FlightRoute
                route={props.route}
                startingCity={props.from}
                viewActive={viewActive}
            />
        </div>
    )
}
function Createflight(flight,route){
    return(
        <Flight
            route={route}
            key={route.map(flight => flight.flight_number).join("")}
            from={flight.from}
            to={flight.to}
            depart={flight.depart}
            departtime={route[0].time}
            arrivaltime={calculateNewTime(route[route.length-1].time,route[route.length-1].flight_duration)}
            duration={calculateTotalDuration(route[0].time,route[route.length-1].time,route[route.length-1].flight_duration)}
            flight_numbers={route.map(flight => flight.flight_number)}
            stops={route.length<2 ? "Non Stop" : route.length-1+" Stops"}
            class={flight.class}
        />
    )
}
function FlightRoute({ route, startingCity,viewActive }) {
    const flightDetails = [];
    for (let i = 0; i < route.length; i++) {
        const currentFlight = route[i];
        const previousFlight = i > 0 ? route[i - 1] : null;
        const nextflight = i < route.length-1 ? route[i+1]:null;
        const departureTime = currentFlight.time;
        const arrivalTime = calculateNewTime(departureTime, currentFlight.flight_duration);
        const layoff = nextflight && calculateLayoff(arrivalTime,nextflight.time);
        flightDetails.push(
            <div key={currentFlight.flight_number} className="flightinfo">
                <div className="departure">
                    <p>{currentFlight.flight_number}</p>
                    <p className="time_place">{departureTime} {i === 0 ? startingCity : previousFlight.city+"("+airport_data[previousFlight.city].code+")"}</p>
                    <p className="airport">{i === 0 ? airport_data[startingCity.slice(0,-5)].airport : airport_data[previousFlight.city].airport}</p>
                </div>
                <div className="duration">
                    <p >Flight Duration: {currentFlight.flight_duration}</p>
                </div>
                <div className="arrival">
                    <p className="time_place">{arrivalTime} {currentFlight.city}({airport_data[currentFlight.city].code})</p>
                    <p className="airport">{airport_data[currentFlight.city].airport}</p>
                </div>
                {layoff &&
                <div className="layoff_sec">
                    <p><i className="fa-solid fa-hotel"></i></p>
                    <div className="layoff_det">
                        <p className="layoff_time">{layoff} transit in </p>
                        <p className="layoff_airport">{airport_data[currentFlight.city].airport} </p>
                    </div>
                </div>
                }      
            </div>
        );
    }
    return <div className={viewActive?"flightroute active":"flightroute"}>{flightDetails}</div>;
}

export default function Flights(){
    window.scrollTo(0,0);
    if(!checkflightdata()){
        return(
            <div className="flights_page_error">
                <h1>Oops! We encountered an issue with your booking.</h1>
                <p>It seems something unexpected happened. This could be due to a page reload or incomplete booking information.</p>
                <Link to="/">Go back to home page</Link>
            </div>
        )
    }
    const routes=findRoutesWithMaxStops(bookingValuesExport.from.slice(0,-5),bookingValuesExport.to.slice(0,-5));
    return(
        <div className="flights_page">
            <div className="logo">
                <Link to="/"><img id="Logo" src="./assets/images/logo.png" alt="Logo of Kemsi Airlines"/></Link> 
            </div>
            <div className="flights_page_content">
                <h2>Departing Flight</h2>
                <h3>Select your flight from {bookingValuesExport.from.slice(0,-5)} to {bookingValuesExport.to.slice(0,-5)}</h3>
                <h4>{routes.length} Flights found for your trip</h4>
                {routes.length > 0 ? routes.map((route) => Createflight(bookingValuesExport,route)) : <h1>No Flights Found</h1>}
            </div>
        </div>
    )

}
