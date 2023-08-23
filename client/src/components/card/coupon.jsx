import React from "react";
import './card.css';
function Coupon(props){
    return(
        <div className="offer_image card">
            <img src={props.img} alt={props.alt} draggable="false"/>
        </div>
    )    
}
function CreateCoupon(coupon){
    return(
        <Coupon 
        key={coupon.id} 
        img={coupon.img}
        alt={coupon.alt}
        />
    )
}
function CouponSlider(props){
    return(
        <div className="card_slider offer_slider">
            <div className="offer_card card">
                <div className="offers">
                    <div className="left_circles">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="left_out">
                        <div className="left_part">
                            <div className="code_section">
                                <p className="use_code">Use Code:</p>
                                <p className="code">SBI2023</p>
                            </div>
                            <div className="validity">
                                <p className="offer_date">October<br/>31st</p>
                                <p className="valid_till">Valid till</p>
                            </div>                
                        </div>
                    </div>                  
                    <div className="right_out">
                        <div className="right_part">
                            <p className="logo">KEMSI AIRLINES</p>
                            <p className="offer_name">Flat 18% off</p>
                            <p className="offer_tag">Using SBI credit cards</p>
                        </div>
                    </div>                
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="right_circles">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>                  
                </div>
            </div>   
            {props.cards.map(CreateCoupon)}
        </div>
    )
}
export default CouponSlider;