import React from "react";
import './contact.css';
import { createParagraph } from "./about";
import contacts from '../jsons/contact.json';
import NavBar from "../components/nav_bar/nav_bar";
import { InputContainer } from "./login";

function ContactField(props){
    return(
        <div className="contact">
            <i className={props.contact_icon}></i>
            <h3>{props.contact_type}</h3>
            {props.contact_info.map(createParagraph)}
        </div>
    )
}
function creatContact(contact,index){
    return(
        <ContactField
            key={index}
            contact_icon={contact.icon}
            contact_type={contact.type}
            contact_info={contact.info}
        />
    )
}
export default function Contact(){
    window.scrollTo(0,0);
    return(
        <div id="contact_us_page">
            <NavBar/>
            <div className="contact_us">
                <div className="contacts">
                {contacts.map(creatContact)}
                </div>                
                <div className="vertical_line"></div>
                <form className="contact_form">
                    <h2>Leave us a message</h2>
                    <InputContainer label="Enter your name" type="text" placeholder="Enter your name"/>
                    <InputContainer label="Enter your email" type="text" placeholder="Enter your email"/>
                    <div className="input_container">
                        <label>Enter your message</label>
                        <textarea placeholder="Enter your message" className="message"/>
                    </div>
                    <button>Send</button>
                </form>    
            </div>           
        </div>      
    )
}

