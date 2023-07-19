import React, {useRef,useEffect} from "react";
import CouponSlider from "./coupon";
import './card.css';
import { Link } from "react-router-dom";
function Card(props){
    return (
        <div className={"card "+props.class}>
            <div className="body">
                <img src={props.img} alt={props.alt} draggable="false"/>
                <div className="text">
                    <li className="name">{props.name}</li>
                    <li className="description">{props.description}</li>
                </div>
            </div>
            <div className="tag">
                <Link to= {props.link} draggable="false">Learn More</Link>
            </div>
        </div>    
    )
}
function Createcard(card){
    return(
        <Card
            key={card.id}
            img={card.img}
            alt={card.alt}
            name={card.name}
            description={card.description}
            link={card.link}
        />
    )
}
function CardSlider(props){
    return(
        <div className="card_slider">
           {props.cards.map(Createcard)}
        </div>        
    )
}

function CardSection(props){
    const cardSectionRef = useRef(null);
    useEffect(()=>{
        const cardSec = cardSectionRef.current;
        const cardSl=cardSec.querySelector(".card_slider");
        const sliders=cardSec.querySelectorAll(".sliders");
        const first_card_width=cardSl.querySelector(".card").offsetWidth;
        const card_sliderChildrens=[...cardSl.children];

        let isDragging = false, startX, startScrollLeft,timeoutId;
        let cardPerView = Math.round(cardSl.offsetWidth/first_card_width);

        //code for dragging   
        const dragStart=(e)=>{
            isDragging=true;
            cardSl.classList.add("drag");
            startX=e.pageX;
            startScrollLeft=cardSl.scrollLeft;
        }
        const dragStop=(e)=>{
            isDragging=false;
            cardSl.classList.remove("drag");
        }
        const dragging=(e)=>{
            if(!isDragging) return;
            cardSl.scrollLeft=startScrollLeft-(e.pageX-startX);
        }    
    
        //code for buttons
        sliders.forEach(slider => {
            slider.addEventListener("click",()=>{
                cardSl.scrollLeft += slider.className.includes("left") ? -first_card_width : first_card_width;
            })
        });
    
        //code for infinite scrolling   
        card_sliderChildrens.slice(-cardPerView).reverse().forEach(card =>{
            cardSl.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
    
        card_sliderChildrens.slice(0,cardPerView).forEach(card =>{
            cardSl.insertAdjacentHTML("beforeend", card.outerHTML);
        });
    
        const infiniteScroll=()=>{
            if(cardSl.scrollLeft===0){
                cardSl.classList.add("notransition");
                cardSl.scrollLeft = cardSl.scrollWidth - (2*cardSl.offsetWidth);
                cardSl.classList.remove("notransition");
            }
            else if(Math.ceil(cardSl.scrollLeft)===cardSl.scrollWidth-cardSl.offsetWidth){
                cardSl.classList.add("notransition");
                cardSl.scrollLeft=cardSl.offsetWidth;
                cardSl.classList.remove("notransition");
            }
            clearTimeout(timeoutId);
            if(!cardSec.matches(":hover")) autoplay();
        }        
    
        //code for autoplay
        const autoplay= () => {
            if(window.innerWidth < 2 ) return;
            timeoutId = setTimeout(() => cardSl.scrollLeft+=first_card_width, 1500);
        }
        autoplay();
    
        cardSl.addEventListener("mousedown",dragStart);
        cardSl.addEventListener("mousemove",dragging);
        window.addEventListener("mouseup",dragStop);
        cardSl.addEventListener("scroll",infiniteScroll);
        cardSec.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        cardSec.addEventListener("mouseleave", autoplay);       
    })

    return(
        <div ref={cardSectionRef} className={"card_section "+props.class}>
            <i className="fa-solid fa-chevron-left sliders left"></i>
            {props.class === "offer_section" 
             ? <CouponSlider cards={props.cards}/>
             : <CardSlider cards={props.cards}/>}
            <i className="fa-solid fa-chevron-right sliders right"></i>
        </div>
    )
}

export default CardSection;
export {Createcard};