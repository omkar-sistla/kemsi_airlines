import React, { useContext, useEffect, useState} from "react";
import { InputContainer } from "./login";
import { Link, useNavigate } from "react-router-dom";
import "./passengers.css"
import { BookingContext } from "../context/bookingContext";
import { Createflight } from "./flightexpress";
import { convertDateToDayOfWeek } from "./flightexpress";
function Passenger() { 
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
    const navigate = useNavigate();
    const [currentbook] = useState(
        JSON.parse(localStorage.getItem("bookingValues")) || null 
    );
    const [disableForm,setDisableForm]=useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {setPassengers, bookedRoute} = useContext(BookingContext);
    const [currentCount, setCurrentCount] = useState(1);
    useEffect(() => {
        // This code will run when the component mounts or when the navigation changes
        setCurrentCount(1);
        setPassengers([]);
    }, [setPassengers]);
    const [currentPassenger, setCurrentPassenger] = useState({
        name: "",
        age: "",
        gender: "Male",
        email: "",
        mobile:"",
    });

    const totalPassengers = JSON.parse(localStorage.getItem("bookingValues")).passengers;
    const handleAgeChange = (e) => {
        e.preventDefault();
        const enteredAge = e.target.value;
        // Check if enteredAge is a valid age (for example, greater than or equal to 0)
        if (enteredAge >= 0) {
            setCurrentPassenger(prev => ({ ...prev, age: enteredAge }));
            setErrorMsg(""); // Clear any previous error message
        } else {
            setCurrentPassenger(prev => ({ ...prev, age: "" })); // Clear the age field
            setErrorMsg("Invalid age"); // Set error message
        }
    }
    const handleNextPassenger = (e) => {
        e.preventDefault();
        if (!currentPassenger.name || !currentPassenger.age || !currentPassenger.gender || !currentPassenger.email || !currentPassenger.mobile) {
            setErrorMsg("Fill the fields");
            return;
        }
        setPassengers(prevPassengers => [...prevPassengers, currentPassenger]);
        setCurrentCount(currentCount+1);
        setCurrentPassenger({ name: "", age: "", gender: "Male", email:"", mobile:"" });
        setErrorMsg("");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentPassenger.name || !currentPassenger.age || !currentPassenger.gender) {
            setErrorMsg("Fill the fields");
            return;
        }
        setDisableForm(!disableForm);
        setPassengers(prevPassengers => [...prevPassengers, currentPassenger]);
        setErrorMsg("");
    }
    const handleProceed = (e)=>{
        e.preventDefault();
        navigate("/booking/payment")
    }
    function checkBookData(){
        if (bookedRoute === undefined){
            return false;
        }
        else{
            return true;
        }
    }
    if(!checkBookData()){
        return(
            <div className="flights_page_error">
                <h1>Oops! We encountered an issue with your booking.</h1>
                <p>It seems something unexpected happened. This could be due to a page reload or incomplete booking information.</p>
                <Link to="/">Go back to home page</Link>
            </div>
        )
    } else{    
        return (
            <div className="passengers_page">           
                <div className={scrolled?"booking_header scrolled":"booking_header"}>
                    <div className="logo">
                        <Link to="/"><img id="Logo" src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="Logo of Kemsi Airlines"/></Link> 
                    </div>
                    <div className="process_indicator">
                        <div className="process done">
                            <div className="process_number"><p>1</p></div>
                            <p className="process_name">Flights</p>
                        </div>
                        <div className="process active">
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
                <h2 className={scrolled?"your_flight scrolled":"your_flight"}>Your Flight</h2>
                {Createflight(currentbook,bookedRoute)}
                {!disableForm && <h2 className="passenger_details">Please Enter Passenger Details</h2>}
                {!disableForm 
                ?<form className={"passenger_form "}>
                    <h2>Passenger {currentCount}</h2>
                    <div className="row">
                        <InputContainer label="Name" type="text" placeholder="Name"
                            value={currentPassenger.name}
                            onChange={(e) => setCurrentPassenger(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <div className="input_container">
                            <label>Age</label>
                            <input type="number" placeholder="Age" min="0"
                            onChange={handleAgeChange} 
                            value={currentPassenger.age}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input_container">
                            <label>Gender</label>
                            <select onChange={(e) => setCurrentPassenger(prev => ({ ...prev, gender: e.target.value }))} value={currentPassenger.gender}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <InputContainer label="Email" type="text" placeholder="Email"
                            value={currentPassenger.email}
                            onChange={(e) => setCurrentPassenger(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div className="row">
                        <InputContainer label="Mobile Number" type="text" placeholder="Mobile Number"
                            value={currentPassenger.mobile}
                            onChange={(e) => setCurrentPassenger(prev => ({ ...prev, mobile: e.target.value }))}
                        /> 
                        {currentCount<totalPassengers
                            ?<button type="submit" onClick={handleNextPassenger}>Next Passenger</button>
                            :<button type="submit" onClick={handleSubmit}>Submit</button>
                        }                 
                    </div>
                    <b className="error_message">{errorMsg}</b>
                </form>
                :<form className="proceed_form">
                    <h2>Passenger details Entered <i className="fa-solid fa-check"></i></h2>
                    <button onClick={handleProceed}>Proceed to Payment</button>
                </form>}
            </div>
        )
    }
}

export default Passenger;
