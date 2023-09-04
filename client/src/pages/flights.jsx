import React from "react";
import './flights.css'
import { bookingValuesExport } from "../components/booking/booking";
import flight_data from "../jsons/flight_data.json";
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
    // Parse the time strings in 24-hour format.
    const currentFlightTime = parseTime(currentFlight);
    const nextFlightTime = parseTime(nextFlight);
    // Calculate the flight duration in minutes.
    const flightDurationMinutes = parseFlightDuration(flightDuration);
    // Add one more hour for the minimum waiting period.
    const waitingPeriodMinutes = 60;
    // Calculate the time when the current flight can leave.
    const currentFlightEndTime = new Date(currentFlightTime.getTime() + flightDurationMinutes * 60 * 1000 + waitingPeriodMinutes * 60 * 1000);
    // Check if it's possible to catch the next flight.
    return currentFlightEndTime <= nextFlightTime;
}
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes);
}
function parseFlightDuration(durationString) {
    const hoursMatch = durationString.match(/(\d+) hour/);
    const minutesMatch = durationString.match(/(\d+) minute/);
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
                    <p className="view">VIEW FLIGHT DETAILS</p>
                </div>
                
                <div className="faredetails">
                    <p className="class">{props.class}</p>
                    <p className="tag">Your price starts from</p>
                    <p className="inr">INR</p>
                    <p className="price">{props.class === "Business Class" && getRandomNumberInRange(20000,24000)}
                    {props.class === "Economy" && getRandomNumberInRange(3600,5800)}
                    {props.class === "First Class" && getRandomNumberInRange(36000,42000)}</p>
                </div>      
            </div>
            <FlightRoute
                route={props.route}
                startingCity={props.from}
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
function FlightRoute({ route, startingCity }) {
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
          <p>{currentFlight.flight_number}</p>
          <div className="departure">
            <p>{departureTime}</p>
            <p>{i === 0 ? startingCity : previousFlight.city}</p>
          </div>
          <div className="duration">
            <p >{currentFlight.flight_duration}</p>
          </div>
          
          <div className="arrival">
            <p>{arrivalTime}</p>
            <p>{currentFlight.city}</p>
          </div>
          <div className="layoff">
            {layoff && <p>{layoff}</p>}
          </div>          
        </div>
      );
    }
    return <div className="flightroute">{flightDetails}</div>;
}

export default function Flights(){
    window.scrollTo(0,0);
    if(!checkflightdata()){
        return(
            <div>
                <h1>Oops! We encountered an issue with your booking.</h1>
                <p>It seems something unexpected happened. This could be due to a page reload or incomplete booking information.</p>
                <Link to="/">Go back to home page</Link>
            </div>

        )
    }
    const routes=findRoutesWithMaxStops(bookingValuesExport.from.slice(0,-5),bookingValuesExport.to.slice(0,-5));
    console.log(routes);
    return(
        <div className="flights_page">
            <h1>Departing Flight</h1>
            {routes.length > 0 ? routes.map((route) => Createflight(bookingValuesExport,route)) : <h1>No Flights Found</h1>}
        </div>
    )

}
console.log(checkflightdata())
