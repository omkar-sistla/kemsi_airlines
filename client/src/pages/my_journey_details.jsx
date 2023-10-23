import './my_journey_details.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import axios from "axios";
import { JourneyContext } from "../context/ticketsContext";
import { convertDateToDayOfWeek } from "./flightexpress";

function Ticket(props){
  return(
    <div className='ticket_card'>
      <div className="ticket">
        <div className="flight_number">
          <p >{props.flight_no}</p>
        </div>
        <div className='ticket_details'>
          <div className="from_side">
            <p className="date">{convertDateToDayOfWeek(props.depart_date)}</p>
            <p className="time">{props.departure_time.slice(0,5)}</p>        
            <p className="place">{props.start_city}</p>
          </div>
          <div className="middle_part">
                <div className="line"></div>
                  <p className="duration">{props.flight_duration.slice(0,2)+"h "+props.flight_duration.slice(3,5)+"min"}</p>
                <div className="line"></div>
            </div>
          <div className="to_side">
            <p className="date">{convertDateToDayOfWeek(props.depart_date)}</p>        
            <p className="time">{props.arrival_time.slice(0,5)}</p>        
            <p className="place">{props.end_city}</p>
          </div>
        </div>
        <div className="right_part">
          <div className="class">
            <p>{props.class}</p>
          </div>      
          <button>Download Ticket</button>
        </div>

      </div>

    </div>
  )
}
function Passenger(props){
  return(
    <div className="passenger">
    <div></div>
      <h2>{props.Passenger_Name}</h2>
      <p className="name_gender">{props.Passenger_Age +" years, "+props.Passenger_Gender}</p>
      <div className='contact_section'>
        <div className='contact_details'>
          <p className="field">Email</p>
          <p className='value'>{props.Passenger_Email}</p>
        </div>
        <div className='contact_details'>
          <p className="field">Mobile Number</p>
          <p className='value'>{props.Passenger_Mobile}</p>
        </div>
      </div>

    </div>
  )
}
function CreateTicket(ticket){
  return (
    <Ticket
      flight_no={ticket.flight_no}
      start_city={ticket.start_city}
      depart_date={ticket.Depart_Date}
      departure_time={ticket.departure_time}
      flight_duration={ticket.flight_duration}
      end_city={ticket.end_city}
      arrival_time={ticket.arrival_time}
      class={ticket.class}
      key={ticket.Ticket_Id}
    />
  )
}
function CreatePassenger(passenger){
  return(
    <Passenger
      key={passenger.Passenger_Id}
      Passenger_Name={passenger.Passenger_Name}
      Passenger_Age={passenger.Passenger_Age}
      Passenger_Gender={passenger.Passenger_Gender}
      Passenger_Email={passenger.Passenger_Email}
      Passenger_Mobile={passenger.Passenger_Mobile}
    />
  )
}
export default function JourneyDetails(){
  const navigate = useNavigate();
  const {bookingId, journey} = useContext(JourneyContext);
  const [JourneyDetails, setJourneyDetails] = useState({});
  console.log(bookingId);
  console.log("journey",journey);
  console.log("test", journey.From_City);
  useEffect(()=>{
    const getBookingDetails = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3000/bookings/ticket`,
            { Booking_Id: bookingId },
            { withCredentials: true } // This should be the third argument
          );
          setJourneyDetails(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    getBookingDetails();
  },[bookingId]);

  if (journey.From_City===undefined){
    navigate("/my-journeys");
    return null;
  }
  const cancelJourney = async () => {
    try {
      const userConfirmed = window.confirm("Are you sure you want to cancel the journey?");
      if (userConfirmed) {
        const response = await axios.patch(`http://localhost:3000/bookings/cancel-journey`, {
          Booking_Id: bookingId
        });
        console.log(response.data);
        // Display "Cancelled Successfully" message using alert
        alert(response.data);
        // Navigate to home page
        navigate("/my-journeys"); // Change this to the actual URL of your home page
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return(
    <div className="journey_details_page">
      <div className="journey_details_header">
        {bookingId && <h2>Booking Id: {journey.Booking_Id}</h2>}
        <div className="from_and_to">
          <div className="journey_details_header_from_to">
              <p className="date">{convertDateToDayOfWeek(journey.Depart_Date)}</p>
              <p className="place">{journey.From_City.slice(-4,-1)}</p>
          </div>
          <div className="middle_part">
              <div className="line"></div>
              <p>Departure</p>
              <div className="line"></div>
          </div>
          <div className="journey_details_header_from_to from">
              <p className="date">{convertDateToDayOfWeek(journey.Depart_Date)}</p>
              <p className="place">{journey.To_City.slice(-4,-1)}</p>
          </div>   
        </div>
        <div className="from_and_to_mobile">
          <p className="place">{journey.From_City.slice(-4,-1)} - {journey.To_City.slice(-4,-1)}</p>
          <p className="date">{convertDateToDayOfWeek(journey.Depart_Date)}</p>
        </div>
      </div>
      
      <div className='journey_details'>
        <h2 className='section_name'>Flight Information</h2>
        {JourneyDetails.tickets && JourneyDetails.tickets.length>0 && JourneyDetails.tickets.map(CreateTicket)} 
        <h2 className='section_name'>Passenger Information</h2>
        {JourneyDetails.passengers && JourneyDetails.passengers.length>0 && JourneyDetails.passengers.map(CreatePassenger)}
        {journey.Status && journey.Status==="Confirmed" && <button type='button' className='cancel_journey' onClick={cancelJourney}>Cancel Journey</button>}
      </div>
    </div>
  )
}
