import React from "react";
import './pleaselogin.css'
import { Link } from "react-router-dom";
export default function PleaseLogin(){
    return(
        <div className="pleaselogin">
            <p>Please Login In to Continue</p>
            <Link to="/login">Click Here To Login</Link>
        </div>
    )
}