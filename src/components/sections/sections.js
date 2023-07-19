import React from "react";
import CardSection from "../card/card.jsx";
function Section(props){
    return(
        <div id={props.id}>
            <h1>{props.heading}</h1>
            <h3>{props.tagline}</h3>
            <CardSection cards={props.cards} class={props.csecclass}/>
        </div>
    )
}
export default Section;