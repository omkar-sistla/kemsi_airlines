import React from "react";
import './feedback.css'
import { InputContainer } from "./login";
import NavBar from "../components/nav_bar/nav_bar";
import feedbackcategories from "../jsons/feedback.json";
function createOptions(option,index){
    return(
        <option key={index} value={option}>{option}</option>
    )
}
function DropDown(props){
    return(
        <div className="dropdown">
            <input list={props.list} placeholder={props.placeholder}/>
            <datalist id={props.list}>{props.data.map(createOptions)}</datalist>
        </div>
    )
}
function CreateDropDown(dropdown){
    return(
        <DropDown
            list={dropdown.list}
            placeholder={dropdown.placeholder}
            data={dropdown.options}
        />
    )
}
export default function Feedback(){
    return(
        <div id="feedback_page">
            <NavBar/>
            <form className="feedback_form">
                <h1>Help Us Improve</h1>
                <InputContainer label="Enter your name" type="text" placeholder="Enter your name"/>
                <InputContainer label="Email" type="text" placeholder="Email"/>
                <div className="input_container">
                    <label>Select Category</label>
                    {CreateDropDown(feedbackcategories)}
                </div>
                <div className="input_container">
                    <label>Enter your message</label>
                    <textarea placeholder="Enter your message" className="message"/>
                </div>
                <button>Submit</button>

            </form>
        </div>
    )
}