import React from "react";
import { Link } from "react-router-dom";
import './footer.css';
function Footer(){
    return (
        <footer>
            <div className="footer_content">
                <div className="address footer_col">
                    <h3 className="footer_labels">Office</h3>
                    <div className="footer_contact">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="contact_info">
                            <p>Kemsi airlines building, Kemsi road, <br/>Kemsi nagar</p>
                        </div>
                    </div>
                    <div className="footer_contact">
                        <i className="fa-sharp fa-solid fa-envelope"></i>
                        <div className="contact_info">
                            <p>contactkemsi@kemsiairlines.ac.in</p>
                            <p>kemsicontact@kemsiairlines.ac.in</p>
                        </div>
                    </div>
                    <div className="footer_contact">
                        <i className="fa-solid fa-phone"></i>
                        <div className="contact_info">
                            <p>+91 94xxxxxxxx</p>
                            <p>+91 83xxxxxxxx</p>
                        </div>
                    </div>
                </div>
                <div className="links footer_col">
                    <h3 className="footer_labels">Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/feedback">Feedback</Link>
                    <Link to="/contact-us">Contact Us</Link>
                </div>
                <div className="col_pack">
                    <div className="guideline_links footer_col">
                        <h3 className="footer_labels">Guidelines</h3>
                        <Link to="/baggage">Baggage</Link>
                        <Link to="/boarding-and-check-in">Boarding and Check-In</Link>
                        <Link to="/inflight">In-flight</Link>
                    </div>
                    <div className="follow_us footer_col">
                        <h3 className="footer_labels">Follow Us</h3>
                        <div className="social_media">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p draggable="true">All rights reserved © KEMSI AIRLINES</p>
        </footer>
    )
}
export default Footer;