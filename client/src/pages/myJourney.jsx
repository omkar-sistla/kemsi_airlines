import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JourneyContext } from "../context/ticketsContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import './myJourney.css';

function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(originalDate);
}

function Journey(props){
    const navigate = useNavigate();
    const {setBookingId,setJourney} = useContext(JourneyContext);
    useEffect(() => {
        if (props.Booking_Id) {
            setBookingId(props.Booking_Id);
            setJourney(props.journey);
        }
    }, [props.Booking_Id, setBookingId, props.journey, setJourney]);

    const getTickets = () => {
        navigate('/my-journeys/journey-details'); // Navigate to "/tickets" when clicked
    }
    return(
        <div className="journey" onClick={getTickets}>
            <i className="fa-solid fa-plane-departure"></i>
            <div className="journey_details">
                <div className="place_details">
                    <p className="place">{props.From_City}</p>
                    <i className="fa-solid fa-arrow-right"></i>
                    <p className="place">{props.To_City}</p>
                </div>
                <p className="trip_type">One Way Flight</p>  
                <p className="date">{formatDate(props.Depart_Date)}</p>
            </div>
            <i className="fa-solid fa-angle-right"></i>
        </div>
)}
function CreateJourney(journey){
    return(
        <Journey
            journey = {journey}
            key = {journey.Booking_Id}
            Booking_Id = {journey.Booking_Id}
            From_City={journey.From_City.slice(0,-5)}
            To_City={journey.To_City.slice(0,-5)}
            Depart_Date={journey.Depart_Date}
        />
    )
}
export default function MyJourneysPage(){
    const[journeyType, setJourneyType] = useState("upcoming");
    const{user} = useContext(AuthContext);
    const [upcomingJourneys,setUpcomingJourneys] = useState("");
    useEffect(() => {
        const getUpcomingJourneys = async () => {
            try {
                const response = await axios.post(`https://kemsi-airlines-backend.vercel.app/bookings/upcoming-journeys`, {
                    email: user.Email
                }, {
                    withCredentials: true
                });
                const result_bookings = response.data;
                setUpcomingJourneys(result_bookings);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getUpcomingJourneys();
    }, [user]);


    const [completedJourneys,setCompletedJourneys] = useState("");
    useEffect(() => {
        const getCompletedJourneys = async () => {
            try {
                const response = await axios.post(`https://kemsi-airlines-backend.vercel.app/bookings/completed-journeys`, {
                    email: user.Email
                }, {
                    withCredentials: true
                });
                const result_bookings = response.data;
                setCompletedJourneys(result_bookings);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getCompletedJourneys();
    }, [user]);

    const [cancelledJourneys,setCancelledJourneys] = useState("");
    useEffect(() => {
        const getCancelledJourneys = async () => {
            try {
                const response = await axios.post(`https://kemsi-airlines-backend.vercel.app/bookings/cancelled-journeys`, {
                    email: user.Email
                }, {
                    withCredentials: true
                });
                const result_bookings = response.data;
                setCancelledJourneys(result_bookings);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getCancelledJourneys();
    }, [user]);

    return(
        <div className="my_journeys_page">
            <div className="my_journeys_header">
                <div className="name_and_button">
                    <div className="backbutton">
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>                 
                    <h2>My Journeys</h2>
                </div>                    
                <div className="booking_type">
                    <p className={journeyType==="upcoming"?"active":""} onClick={()=>setJourneyType("upcoming")}>Upcoming</p>
                    <p className={journeyType==="completed"?"active":""} onClick={()=>setJourneyType("completed")}>Completed</p>
                    <p className={journeyType==="cancelled"?"active":""} onClick={()=>setJourneyType("cancelled")}>Cancelled</p>
                </div>
            </div>
            <div className="journeys">
                {journeyType==="upcoming" && (upcomingJourneys.length!==0 ? upcomingJourneys.map(CreateJourney)
                :<div className="no_bookings_div">
                    <i className="fa-solid fa-suitcase-rolling no_bookings"></i>
                    <p>No Upcoming Journeys Found</p>
                </div>)} 
                {journeyType==="completed" && (completedJourneys.length!==0 ? completedJourneys.map(CreateJourney)
                :<div className="no_bookings_div">
                    <i className="fa-solid fa-suitcase-rolling no_bookings"></i>
                    <p>No Completed Journeys Found</p>
                </div>)}
                {journeyType==="cancelled" && (cancelledJourneys.length!==0 ? cancelledJourneys.map(CreateJourney)
                :<div className="no_bookings_div">
                    <i className="fa-solid fa-suitcase-rolling no_bookings"></i>
                    <p>No Cancelled Journeys Found</p>
                </div>)}
            </div>           
        </div>
    )
}