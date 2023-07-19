import React from "react";
import './nav_bar.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import {auth} from "../../config/firebase";
import { signOut } from "firebase/auth";
function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState("");
    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(user.displayName.toLowerCase().charAt(0).toUpperCase() + user.displayName.slice(1));
        } else setIsLoggedIn("");      
        });
    },[]);
    const handleSignOut=()=>{
        signOut(auth).then(()=>{
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const [scrolled, setScrolled] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);
    const ToggleMenu = () => {
        setMenuActive(!menuActive);
        if (!menuActive && window.scrollY<=100){
            setScrolled(true);
        }
        else if (window.scrollY<=100){
            setScrolled(false);
        }
    }
    const ToggleProfile = ()=>{
        setProfileActive(!profileActive);
    }

    window.onscroll=function(){
        if (window.innerWidth<760 && window.scrollY>10){
            setScrolled(true);
        }
        else if (window.scrollY>100 || menuActive) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }
    return(
    <div id="TOP_ELEMENT" className={scrolled ?'top_element scrolled' : 'top_element'}>
        <div className="logo">
            <Link to="/"><img id="Logo" src="./assets/images/logo.png" alt="Logo of Kemsi Airlines"/></Link> 
        </div>
        <i className={menuActive ?"fa-solid fa-xmark" : "fa-solid fa-bars"} onClick={ToggleMenu}></i>
        <div className={menuActive ?"menu active" : 'menu'}>
        <ul className="upper">
            <li><Link id="Contact" to="/contact-us"><i className="fa-solid fa-phone"></i> Contact Us</Link></li>
            <li> {isLoggedIn==="" ? <Link id="Login" to="/login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
            :<div className="display_name">
                <b onClick={ToggleProfile}><i className="fa-solid fa-user"></i> {isLoggedIn}</b>
                <div className={profileActive ?"user_options active" :"user_options"}>
                    <b onClick={handleSignOut}>Logout</b>
                    <b>My Journeys</b>
                </div>
            </div>}
            </li>    
        </ul>
        <ul className="lower">
            <li><Link to="/about-us"><i className="fa-solid fa-people-group"></i> About Us</Link></li>
            <li><Link to="/destinations"><i className="fa-solid fa-map-location-dot"></i> Destinations</Link></li>
            <li><Link to="/feedback"><i className="fa-solid fa-comment"></i> Feedback</Link></li>
            <li><a href="/#"><i className="fa-solid fa-plane"></i> Plan your journey</a></li>
        </ul>                
        </div>
    </div>
    )
}
export default NavBar;