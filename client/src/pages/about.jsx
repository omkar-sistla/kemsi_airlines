import React from "react";
import './about.css';
import NavBar from "../components/nav_bar/nav_bar";
import about from '../jsons/about.json'

function createParagraph(paragraph,index){
    return (<p key={index}>{paragraph}</p>)
}

function Content(props){
    return(
        <div className="content">       
            <h2>{props.head}</h2>           
            {props.img==="" ? null : <img src={props.img} alt="sarle raa" className={"float"+props.float} />}
            {props.content.map(createParagraph)}
        </div>
    )
}
function createcontent(about){
    return (<Content
        key={about.id}
        head={about.head}
        img={about.img}
        content={about.content}
        float={about.float}
    />)
}
export default function About(){
    window.scrollTo(0,0);
    return(
        <div className="about_us">
            <NavBar/>
            <img src="./assets/images/about_us.jpg" className="cover" alt="ok"/>
            <div className="about">
                <h1>About Us</h1>
                {about.map(createcontent)}
            </div>                           
        </div>
    )
}
export {createParagraph}

