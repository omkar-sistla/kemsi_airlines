import React from "react";
import './destinations.css';
import NavBar from "../components/nav_bar/nav_bar";
import destinations from "../jsons/destinations.json"
function Destination(props){
    return(
        <div className="destination">
            <img src={props.img} alt={props.alt} />
            <h2>{props.city}</h2>
            <p>{props.destinations}</p>
        </div>
    )
}
function createDestinations(destination){
    return(
        <Destination
            key = {destination.city}
            img = {destination.img}
            alt = {destination.city}
            city = {destination.city}
            destinations = {destination.destinations}
        />
    )
}
export default function Destinations(){
    window.scrollTo(0,0);
    return(
        <div id="destinations_page">
            <NavBar/>
            <img src="./assets/images/destinations.jpg" className="cover" alt="ok"/>            
            <h1>We take off from</h1>
            <div className="destinations">
                {destinations.map(createDestinations)}
            </div>
        </div>       
    )
}