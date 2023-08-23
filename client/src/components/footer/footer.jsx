import React from "react";
import './footer.css';
function Footer(){
    return (
        <footer>
            <div className="follow_us">
                <p>Follow Us On Social Media</p>
                <div className="social_media">
                    <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.twitter.com"><i className="fa-brands fa-twitter"></i></a>
                    <a href="https://www.linkedin.com"><i className="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
            <hr/>
            <p draggable="true">All rights reserved © KEMSI AIRLINES</p>
        </footer>
    )
}
export default Footer;