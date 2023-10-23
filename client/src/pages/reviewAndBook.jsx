import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../context/bookingContext";
import { AuthContext } from "../context/authContext";
import { Createflight } from "./flightexpress";
import "./payment.css";
function getMySQLDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months are zero-based, so add 1
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros for single digit months, days, hours, minutes, and seconds
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return mysqlDateTime;
}

function createTicketsArray(route, currentbook){
    if (route===undefined){
        return false;
    }
    const tickets = [];
    if (route.stops === 1) {
        tickets.push({
        flight_no: route.flight_no,
        depart_date: currentbook.depart,
        ticket_class:currentbook.class
        });
    } else if (route.stops === 2) {
        tickets.push(
        {
            flight_no: route.first_flight_no,
            depart_date: currentbook.depart,
            ticket_class:currentbook.class
        },
        {
            flight_no: route.second_flight_no,
            depart_date: currentbook.depart,
            ticket_class:currentbook.class
        }
        );
    } else if (route.stops === 3) {
        tickets.push(
        {
            flight_no: route.first_flight_no,
            depart_date: currentbook.depart,
            ticket_class:currentbook.class
        },
        {
            flight_no: route.second_flight_no,
            depart_date: currentbook.depart,
            ticket_class:currentbook.class
        },
        {
            flight_no: route.third_flight_no,
            depart_date: currentbook.depart,
            ticket_class:currentbook.class
        }
        );
    }
  return tickets;
}
function PassengerDetails(props){
    return(
        <div className="passenger">
            <h2>{props.name}</h2>
            <p className="name_gender">{props.age} years, {props.gender}</p>
            <div className="contact_section">
                <div className="contact_details">
                    <p className="field">Email</p>
                    <p className="value">{props.email}</p>
                </div>
                <div className="contact_details">
                    <p className="field">Mobile Number</p>
                    <p className="value">{props.mobile}</p>
                </div>
            </div>
        </div>
    )
}

function CreatePassengerDetails(passenger,index){
    return(
        <PassengerDetails
            key = {index}
            name={passenger.name}
            age={passenger.age}
            gender={passenger.gender}
            email={passenger.email}
            mobile={passenger.mobile}
        />
    )
}

export default function Payment(){
    const navigate = useNavigate();
    const [currentbook] = useState(
        JSON.parse(localStorage.getItem("bookingValues")) || null 
    );

    const {user} = useContext(AuthContext);
    const [bookTheJourney,setBookTheJourney] = useState({
        email:"",
        from_city:"",
        to_city:"",
        booked_date:"",
        depart_date:"",
        tickets_array:[],
        passengers_array:[]
    })
    const {passengers,bookedRoute} = useContext(BookingContext);    
    const [tickets,setTickets] = useState([]); 
    useEffect(()=>{
        setTickets(createTicketsArray(bookedRoute,currentbook));
    },[bookedRoute,currentbook]);
    useEffect(()=>{
        setBookTheJourney(((prev)=>({...prev, 
            email: user.Email,
            from_city:currentbook.from, 
            to_city:currentbook.to, 
            booked_date:getMySQLDateTime(),
            depart_date:currentbook.depart,
            tickets_array:tickets,
            passengers_array:passengers
        })))
    },[currentbook,tickets,passengers,user]);
  
    const handlePayment = async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:3000/book",bookTheJourney,{withCredentials: true} );
            navigate("/", { replace: true });
            alert("Booking Successful");
        } catch(err){
            console.log(err);
        }
    }
    function checkBookData(){
        if (bookedRoute === undefined){
            return false;
        }
        else{
            return true;
        }
    }
    if (!checkBookData()){
        return(
            <div className="flights_page_error">
                <h1>Oops! We encountered an issue with your booking.</h1>
                <p>It seems something unexpected happened. This could be due to a page reload or incomplete booking information.</p>
                <Link to="/">Go back to home page</Link>
            </div>
        )
    } else{
        return(
            <div className="payment_page">
                <div className="booking_header">
                    <div className="logo">
                        <Link to="/"><img id="Logo" src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="Logo of Kemsi Airlines"/></Link> 
                    </div>
                    <div className="process_indicator">
                        <div className="process done">
                            <div className="process_number"><p>1</p></div>
                            <p className="process_name">Flights</p>
                        </div>
                        <div className="process done">
                            <div className="process_number"><p>2</p></div>
                            <p className="process_name">Journey Details</p>
                        </div>
                        <div className="process active">
                            <div className="process_number"><p>3</p></div>
                            <p className="process_name">Review & Payment</p>
                        </div>
                    </div>
                </div>
                <h2 className="your_flight">Your Flight</h2>
                {Createflight(currentbook,bookedRoute)}
                <h2 className="your_flight">Passengers</h2>
                {passengers.map((passenger,index)=>(CreatePassengerDetails(passenger,index)))}
                <div className="price_distribution">
                    <h2>Booking Total</h2>
                    <div className="price_details">
                        {currentbook.class==="Economy" && <p className="price">INR {(bookedRoute.economy_price*currentbook.passengers).toLocaleString('en-In')}</p>}
                        <p>One way Total for all passenger(s) (including Taxes, Charges and Fees)</p>
                        <p>A non-refundable Convenience Fee of INR 50 per passenger will apply on this booking</p>
                        <div className="links">
                            <a href="/baggage" target="_blank" rel="noopener noreferrer">Baggage Guidelines <i className="fa-solid fa-angle-right"></i></a>
                            <a href="/boarding-and-check-in" target="_blank" rel="noopener noreferrer">Boarding and Check-in Guidelines <i className="fa-solid fa-angle-right"></i></a>
                            <a href="/inflight" target="_blank" rel="noopener noreferrer">Inflight Guidelines <i className="fa-solid fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <button className="payment_button" type="button" onClick={handlePayment}>Pay INR {(bookedRoute.economy_price*currentbook.passengers).toLocaleString('en-In')}</button>
            </div>
        )
    }

}