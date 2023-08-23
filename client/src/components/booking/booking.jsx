import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import './booking.css';
import Select from "../select_input/select";
export let bookingValuesExport={roundTrip:true,
    from:"",
    to:"",
    depart:"",
    return:"",
    passengers:"1",
    class:"Economy",
    specialfare:"None",
    promo:"",
    departDay:"",
    returnDay:""};
const countries=[
    ['AMD', 'Ahmedabad', 'Sardar Vallabhbhai Patel International Airport'],
    ['ATQ', 'Amritsar', 'Amritsar International Airport'],
    ['BLR', 'Bengaluru', 'Kempegowda International Airport'],
    ['IXC', 'Chandigarh', 'Chandigarh International Airport'],
    ['MAA', 'Chennai', 'Chennai International Airport'],
    ['GOI', 'Goa', 'Goa International Airport'],
    ['HYD', 'Hyderabad', 'Rajiv Gandhi International Airport'],
    ['JAI', 'Jaipur', 'Jaipur International Airport'],
    ['COK', 'Kochi', 'Cochin International Airport'],
    ['CCU', 'Kolkata', 'Netaji Subhas Chandra Bose International Airport'],
    ['CCJ', 'Kozhikode', 'Calicut International Airport'],
    ['IXM', 'Madurai', 'Madurai International Airport'],
    ['IXE', 'Mangalore', 'Mangalore International Airport'],
    ['BOM', 'Mumbai', 'Chhatrapati Shivaji Maharaj International Airport'],
    ['DEL', 'New Delhi', 'Indira Gandhi International Airport'],
    ['PNQ', 'Pune', 'Pune International Airport'],
    ['SXR', 'Srinagar', 'Srinagar International Airport'],
    ['TRV', 'Thiruvananthapuram', 'Trivandrum International Airport'],
    ['VGA', 'Vijayawada', 'Vijayawada International Airport']
  ];
function Booking(){
    const [bookingValues, setBookingValues] = useState({
        roundTrip:true,
        from:"",
        to:"",
        depart:"",
        return:"",
        passengers:"1",
        class:"Economy",
        specialfare:"None",
        promo:"",
        departDay:"",
        returnDay:""
    });
    const today = new Date();
    const maxdate = new Date();
    maxdate.setMonth(maxdate.getMonth() + 3);
    const [minDate] = useState(today.toISOString().split('T')[0]);
    const [maxDate] = useState(maxdate.toISOString().split('T')[0]);
    const [showFlightsDisable, setShowFlightsDisable]=useState(true);
    const navigate = useNavigate();
    const handleBooking =()=>{
        console.log(bookingValues);
        navigate("/flights");
    }
    const handleOnewaySelect = ()=>{
        setBookingValues((prev) => ({
            ...prev,
            roundTrip: false,
            return: "",
            returnDay: "",
          }));
    }
    const handleFromOption = (option) => {
        setBookingValues((prev)=>({...prev, from:option}));
    };
    const handleToOption = (option) => {
        setBookingValues((prev)=>({...prev, to:option}));
    };
    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    };
    useEffect(() => {
        bookingValuesExport = bookingValues;
      }, [bookingValues]);
    
    useEffect(() => {
        if ((bookingValues.roundTrip===true) && (bookingValues.depart ==="" || bookingValues.departDay==="" || bookingValues.from==="" || bookingValues.to==="" || bookingValues.return==="" || bookingValues.returnDay==="")){
            setShowFlightsDisable(true);
        }else if ((bookingValues.roundTrip===false) && (bookingValues.depart ==="" || bookingValues.departDay==="" || bookingValues.from==="" || bookingValues.to==="")){
            setShowFlightsDisable(true);
        }else{
            setShowFlightsDisable(false)
        };
    },[bookingValues])


    return(
        <div className="booking">
            <h1>Search Flights</h1>
            <div id="type">
                <div className="one_way">
                    <input type="radio" className="one_way" id="one_way" name="trip-type"
                        onChange={handleOnewaySelect}
                    />
                    <label htmlFor="one_way" className="one_way">One Way</label>
                </div>
                <div className="round_trip">                    
                    <input type="radio" className="round_trip" id="round_trip" name="trip-type" checked={bookingValues.roundTrip}
                        onChange={()=>setBookingValues((prev)=>({...prev, roundTrip:true}))} 
                    />
                    <label htmlFor="round_trip" className="round_trip">Round Trip</label>
                </div>    
            </div>
            <div id="details">
                <div className="input_group">
                    <div className="details input_container"> 
                        <label>From</label>
                        <Select options={countries.filter((option)=>option[1].toLowerCase()!==bookingValues.to.toLowerCase().slice(0,-5))} 
                        placeholder="From" onSelect={handleFromOption}/> 
                    </div>
                    <div className="details input_container"> 
                        <label>To</label>
                        <Select options={countries.filter((option)=>option[1].toLowerCase()!==bookingValues.from.toLowerCase().slice(0,-5))} 
                        placeholder="To" onSelect={handleToOption} class="to"/> 
                    </div>
                </div>
                <div className="input_group">
                    <div className="details date_details input_container" >
                        <label htmlFor="depart">Depart Date</label>
                        <input type="date" id="depart" className="date" min={minDate} max={maxDate} 
                            onChange={(e)=> {
                            setBookingValues((prev)=>({...prev, departDay:getDayOfWeek(e.target.value)}))
                            setBookingValues((prev)=>({...prev, depart : e.target.value}))}}
                        />                    
                    </div> 
                    <div className="details date_details input_container">
                        <label htmlFor="return">Return Date</label>
                        <input type="date" id="return" className="date" disabled={!bookingValues.roundTrip} min={bookingValues.depart==="" ?minDate:bookingValues.depart} max={maxDate}                           
                            onChange={(e)=> {
                                setBookingValues((prev)=>({...prev, returnDay:getDayOfWeek(e.target.value)}))
                                setBookingValues((prev)=>({...prev, return : e.target.value}))}}
                        />                   
                    </div>
                </div>
                <div className="input_group">
                    <div className="details other_details input_container">
                        <label>Passengers</label>
                        <select onChange={(e)=> setBookingValues((prev)=>({...prev, passengers : e.target.value}))}>
                            <option disabled={true}>Select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="details other_details input_container">
                        <label>Class</label>
                        <select onChange={(e)=> setBookingValues((prev)=>({...prev, class : e.target.value}))}>
                            <option>Economy</option>
                            <option>First Class</option>
                            <option>Business Class</option>
                        </select>
                    </div>
                </div>
                
            </div>
            <div id="row_3">
                <div className="input_group">
                    <div className="row_3 fare_type spl input_container">
                        <label>Special Fare</label>
                        <select onChange={(e)=> setBookingValues((prev)=>({...prev, specialfare : e.target.value}))}>
                            <option>None</option>
                            <option>Armed Forces</option>
                            <option>Bravery Awardee</option>
                            <option>Para Military Force</option>
                            <option>Student</option>
                            <option>Senior Citizen</option>
                            <option>War Disabled Officer</option>
                        </select>
                    </div>
                    <div className="row_3 fare_type promo input_container">
                        <label>Add Promocode</label>
                        <input type="text" placeholder="Add Promocode" id="add_promo"
                            onChange={(e)=> setBookingValues((prev)=>({...prev, promo : e.target.value}))}
                        />
                    </div> 
                </div>
            </div>               
                <div className="input_container">
                    <button id="show_flight" onClick={handleBooking} disabled={showFlightsDisable}>Show Flights</button>                
                </div>
            </div>                             
    )
}
export default Booking;