import React, { useEffect } from "react";
import './flights.css'
import { useState } from "react";
import airport_data from "../jsons/airport_info.json"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { BookingContext } from "../context/bookingContext";
export function convertDateToDayOfWeek(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 (Sunday)
    const dayOfMonth = date.getDate(); // 21
    const month = date.getMonth(); // 9 (October)
    const year = date.getFullYear(); // 2023
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const formattedDate = `${dayOfWeek === 0 ? "Sun" : "Mon"}, ${dayOfMonth} ${monthNames[month]} ${year}`;
  
    return formattedDate;
}
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(0, 0,0,  hours, minutes);
}
function changeTimeFormat(timeString){
    const formattedTime = timeString.split(':').slice(0, 2).join(':'); 
    return formattedTime;
}
function calculateLayoff(time1,time2){
    if (time1 && time2){
        const date1 = parseTime(time1);
        const date2 = parseTime(time2);
        const totalTimeMinutes = (date2 - date1) / (1000 * 60);
        const hours = Math.floor(totalTimeMinutes / 60);
        const minutes = totalTimeMinutes % 60;
        return `${hours !==0 ? hours+"h" : ""} ${minutes}min`;
    }
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
                            <p className="date">{convertDateToDayOfWeek(props.depart)}</p>
                            <p className="time">{props.departtime}</p>
                            <p className="airport">{props.from.slice(-4,-1)}</p>
                        </div>
                        <div className="middlepart">
                            <p className="duration">{props.duration}</p>
                            <p className="stops">{props.stops}</p>
                        </div>
                        <div className="toside">
                            <p className="date">{convertDateToDayOfWeek(props.depart)}</p>              
                            <p className="time">{props.arrivaltime}</p>
                            <p className="airport">{props.to.slice(-4,-1)}</p>
                        </div>
                    </div>
                    <p className="view" onClick={toggleView}>VIEW FLIGHT DETAILS <i className={!viewActive ?"fa-solid fa-angle-down":"fa-solid fa-angle-up"}></i></p>
                </div>
                <div className="faredetails">
                    <p className="class">{props.class}</p>
                    <p className="tag fare">Your price starts from</p>
                    <p className="inr fare">INR</p>
                    <p className="price fare">{props.class === "Business Class" && props.business_class.toLocaleString('en-In')}
                    {props.class === "Economy" && props.economy.toLocaleString('en-In')}
                    {props.class === "First Class" && props.first_class.toLocaleString('en-In')}</p>
                </div>      
            </div>  
            <ExpressFlightRoute
                route={props.route}
                viewActive={viewActive}
            />
            
        </div>
    )
}
export function Createflight(flight,route){
    const findArrivalTime = (route)=>{
        if (route.stops===1){
            return route.arrival_time;
        }
        if (route.stops===2){
            return route.second_arrival_time;
        }
        if (route.stops===3){
            return route.third_arrival_time;
        }
    }
    return(
        <Flight
            route={route}
            key={
                route.stops ===1 ? route.flight_no:
                route.stops ===2 ? route.first_flight_no+route.second_flight_no:
                route.first_flight_no+route.second_flight_no+route.third_flight_no
            }
            from={flight.from}
            to={flight.to}
            depart={flight.depart}
            departtime={changeTimeFormat(route.start_time)}
            arrivaltime={changeTimeFormat(findArrivalTime(route))}
            duration={calculateLayoff(route.start_time,findArrivalTime(route))}
            flight_numbers={
                route.stops === 1 ? [route.flight_no] :
                route.stops === 2 ? [route.first_flight_no, route.second_flight_no] :
                [route.first_flight_no, route.second_flight_no, route.third_flight_no]
            }
            stops={route.stops===1 ? "Non Stop" : route.stops-1+" Stops"}
            class={flight.class}
            economy={route.economy_price}
            business_class={route.business_price}
            first_class={route.first_class_price}
        />
    )
}

function ExpressFlightRoute({route,viewActive}){
    const {bookedRoute, setBookedRoute} = useContext(BookingContext);
    const navigate = useNavigate()
    const handleBookClick = ()=>{
        setBookedRoute(route);
        navigate("/booking/fill-passenger-details");
        console.log(bookedRoute);
    }
    if (route.stops===1){
        return(
            <div className={viewActive?"flightroute active":"flightroute"} key={route.flight_no}>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.start_time)} {route.start_city+"("+airport_data[route.start_city].code+")"}</p>
                        <p className="airport">{airport_data[route.start_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.start_time,route.arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.arrival_time)} {route.end_city+"("+airport_data[route.end_city].code+")"}</p>
                        <p className="airport">{airport_data[route.end_city].airport}</p>
                    </div>
                </div>
                <button onClick={handleBookClick}>Book Now</button>
            </div>
        );
    }
    if (route.stops===2){
        return(
            <div className={viewActive?"flightroute active":"flightroute"} key={route.first_flight_no+route.second_flight_no}>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.first_flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.start_time)} {route.start_city+"("+airport_data[route.start_city].code+")"}</p>
                        <p className="airport">{airport_data[route.start_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.start_time,route.first_arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.first_arrival_time)} {route.transfer_city+"("+airport_data[route.transfer_city].code+")"}</p>
                        <p className="airport">{airport_data[route.transfer_city].airport}</p>
                    </div>
                    <div className="layoff_sec">
                        <p><i className="fa-solid fa-hotel"></i></p>
                        <div className="layoff_det">
                            <p className="layoff_time">{calculateLayoff(route.first_arrival_time,route.second_start_time)} transit in </p>
                            <p className="layoff_airport">{airport_data[route.start_city].airport}</p>
                        </div>
                    </div>    
                </div>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.second_flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.second_start_time)} {route.transfer_city+"("+airport_data[route.transfer_city].code+")"}</p>
                        <p className="airport">{airport_data[route.transfer_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.second_start_time,route.second_arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.second_arrival_time)} {route.end_city+"("+airport_data[route.end_city].code+")"}</p>
                        <p className="airport">{airport_data[route.end_city].airport}</p>
                    </div>   
                </div>
                <button onClick={handleBookClick}>Book Now</button>
            </div>
        );
    }
    if (route.stops===3){
        return(
            <div className={viewActive?"flightroute active":"flightroute"} key={route.first_flight_no+route.second_flight_no+route.third_flight_no}>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.first_flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.start_time)} {route.start_city+"("+airport_data[route.start_city].code+")"}</p>
                        <p className="airport">{airport_data[route.start_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.start_time,route.first_arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.first_arrival_time)} {route.first_transfer_city+"("+airport_data[route.first_transfer_city].code+")"}</p>
                        <p className="airport">{airport_data[route.first_transfer_city].airport}</p>
                    </div>
                    <div className="layoff_sec">
                        <p><i className="fa-solid fa-hotel"></i></p>
                        <div className="layoff_det">
                            <p className="layoff_time">{calculateLayoff(route.first_arrival_time,route.second_start_time)} transit in </p>
                            <p className="layoff_airport">{airport_data[route.start_city].airport}</p>
                        </div>
                    </div>    
                </div>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.second_flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.second_start_time)} {route.first_transfer_city+"("+airport_data[route.first_transfer_city].code+")"}</p>
                        <p className="airport">{airport_data[route.first_transfer_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.second_start_time,route.second_arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.second_arrival_time)} {route.end_city+"("+airport_data[route.end_city].code+")"}</p>
                        <p className="airport">{airport_data[route.end_city].airport}</p>
                    </div>
                    <div className="layoff_sec">
                        <p><i className="fa-solid fa-hotel"></i></p>
                        <div className="layoff_det">
                            <p className="layoff_time">{calculateLayoff(route.second_arrival_time,route.third_start_time)} transit in </p>
                            <p className="layoff_airport">{airport_data[route.first_transfer_city].airport}</p>
                        </div>
                    </div>    
                </div>
                <div className="flightinfo">
                    <div className="departure">
                        <p>{route.third_flight_no}</p>
                        <p className="time_place">{changeTimeFormat(route.third_start_time)} {route.second_transfer_city+"("+airport_data[route.second_transfer_city].code+")"}</p>
                        <p className="airport">{airport_data[route.second_transfer_city].airport}</p>
                    </div>
                    <div className="duration">
                        <p >Flight Duration: {calculateLayoff(route.third_start_time,route.third_arrival_time)}</p>
                    </div>
                    <div className="arrival">
                        <p className="time_place">{changeTimeFormat(route.third_arrival_time)} {route.end_city+"("+airport_data[route.end_city].code+")"}</p>
                        <p className="airport">{airport_data[route.end_city].airport}</p>
                    </div>   
                </div>
                <button onClick={handleBookClick}>Book Now</button>
            </div>
        );   
    }
}
export default function Flights(){  
    const [scrolled, setScrolled] = useState(false);
    window.onscroll=function(){
        if (window.innerWidth<760 && window.scrollY>60){
            setScrolled(true);
        }
        else if (window.scrollY>100) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }
    const [routes,setRoutes]=useState([]);
    const [currentbook] = useState(
        JSON.parse(localStorage.getItem("bookingValues")) || null 
    );
    const [filter, setFilter]=useState("All");
    const [count, setCount]=useState();
    const handleFlightCount=()=>{
        if (routes[0] && routes[1] && routes[2] && filter==="All"){
            setCount(routes[0].length+routes[1].length+routes[2].length);
        }
        if (routes[0] && filter==="Non Stop"){
            setCount(routes[0].length);
        }
        if (routes[1] && filter==="One Stop"){
            setCount(routes[1].length);
        }
        if (routes[2] && filter==="Two Stop"){
            setCount(routes[2].length);
        }
    }
    useEffect(() => {
        handleFlightCount();
    }
    )
    useEffect(() => {
        const getFlights = async () => {
            try {
                const response = await axios.get(`https://kemsi-airlines-backend.vercel.app/flights`, {
                    params: {
                        start_city: currentbook.from.slice(0, -5),
                        end_city: currentbook.to.slice(0, -5)
                    }
                });
                const flightexpress = response.data;
                setRoutes(flightexpress);
                
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if (currentbook) {
          getFlights();
        }
    }, [currentbook]);
    function checkflightdata(){
        if (currentbook.from==="" || currentbook.to===""){
            return false
        }
        return true
    }
    if(!checkflightdata()){
        return(
            <div className="flights_page_error">
                <h1>Oops! We encountered an issue with your booking.</h1>
                <p>It seems something unexpected happened. This could be due to a page reload or incomplete booking information.</p>
                <Link to="/">Go back to home page</Link>
            </div>
        )
    }

    return(
        <div className="flights_page">
            <div className={scrolled?"booking_header scrolled":"booking_header"}>
                <div className="logo">
                    <Link to="/"><img id="Logo" src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="Logo of Kemsi Airlines"/></Link> 
                </div>
                <div className="process_indicator">
                    <div className="process active">
                        <div className="process_number"><p>1</p></div>
                        <p className="process_name">Flights</p>
                    </div>
                    <div className="process">
                        <div className="process_number"><p>2</p></div>
                        <p className="process_name">Journey Details</p>
                    </div>
                    <div className="process">
                        <div className="process_number"><p>3</p></div>
                        <p className="process_name">Review & Payment</p>
                    </div>
                </div>
                <div className="from_and_to">
                    <div className="booking_header_from_to">
                        <p className="date">{convertDateToDayOfWeek(currentbook.depart)}</p>
                        <p className="place">{currentbook.from.slice(-4,-1)}</p>
                    </div>
                    <div className="middle_part">
                        <div className="line"></div>
                        <p>Departure</p>
                        <div className="line"></div>
                    </div>
                    <div className="booking_header_from_to from">
                        <p className="date">{convertDateToDayOfWeek(currentbook.depart)}</p>
                        <p className="place">{currentbook.to.slice(-4,-1)}</p>
                    </div>   
                </div>
                <div className="from_and_to_mobile">
                    <p className="place">{currentbook.from.slice(-4,-1)} - {currentbook.to.slice(-4,-1)}</p>
                    <p className="date">{convertDateToDayOfWeek(currentbook.depart)}</p>
                </div>
            </div>
            <div className={scrolled?"flights_page_content scrolled":"flights_page_content"}>
                <h2>Departing Flight</h2>
                <h3>Select your flight from {currentbook.from.slice(0,-5)} to {currentbook.to.slice(0,-5)}</h3>
                <div className="filter">
                    <h4>{count} Flights found for your trip</h4>
                    <select onChange={(e)=> setFilter(e.target.value)}>
                        <option>All</option>
                        <option>Non Stop</option>
                        <option>One Stop</option>
                        <option>Two Stop</option>
                    </select>
                </div>

                {count===0 ? <h1>No Flights Found</h1> 
                :
                <>
                    {routes[0] && routes[0].length > 0 && (filter==="All" || filter==="Non Stop") && routes[0].map((route) => Createflight(currentbook,route))}
                    {routes[1] && routes[1].length > 0 && (filter==="All" || filter==="One Stop") && routes[1].map((route) => Createflight(currentbook,route))}
                    {routes[2] && routes[2].length > 0 && (filter==="All" || filter==="Two Stop") && routes[2].map((route) => Createflight(currentbook,route))}
                </>
                }               
            </div>
        </div>
    )

}
