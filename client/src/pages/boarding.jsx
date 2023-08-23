import React from "react";
import NavBar from "../components/nav_bar/nav_bar";
export default function Boarding() {
    return(
        <div className="guidelinepage">
        <NavBar/>
        <img src="./assets/images/boarding_page.jpg" className="cover" alt="ok"/>
            <div className="guidelines">
                <h1>Boarding and Check-In Guidelines</h1>
    
                <h2>Online Check-In</h2>
                <ul>
                    <li>Advance Check-In: Take advantage of our online check-in service, available 24 hours before your scheduled departure time. Check-in early to secure your preferred seat and save time at the airport.</li>
                    <li>E-Ticket: Ensure you have your e-ticket or booking reference number handy for online check-in. You can find this information on your booking confirmation email or ticket.</li>
                    <li>Travel Documents: Keep your passport, identification, and any required visas readily accessible during the online check-in process. Ensure they are valid for the duration of your travel.</li>
                    <li>Baggage: Familiarize yourself with the baggage allowances and restrictions for your specific flight. Make sure your baggage complies with the size, weight, and content regulations to avoid any issues during check-in.</li>
                    <li>Seat Selection: Take the opportunity to select your preferred seat during the online check-in process, subject to availability. If you have specific seating preferences or requirements, such as extra legroom or accessibility needs, please contact our customer service in advance.</li>
                </ul>
                
                <h2>Airport Check-In</h2>
                <ul>
                    <li>Arrival Time: Plan to arrive at the airport well in advance of your flight departure. Check the recommended check-in time for your destination and allow sufficient time for security checks and other procedures.</li>
                    <li>Travel Documents: Carry all required travel documents, including your passport, visa, and identification. Ensure they are valid and easily accessible.</li>
                    <li>Baggage Check: Present your checked baggage at the designated check-in counter. Ensure your baggage is properly labeled with your name, contact details, and final destination. Remove any prohibited items from your checked baggage.</li>
                    <li>Baggage Claim Tags: Collect your baggage claim tags/receipts after checking in your luggage. These tags will be used to identify and retrieve your checked baggage at your destination.</li>
                    <li>Security Screening: Proceed to the security screening area after completing the check-in process. Follow the instructions provided by security personnel and place all carry-on items, such as electronics, liquids, and jackets, into the security screening bins.</li>
                </ul>
                
                <h2>Boarding Process</h2>
                <ul>
                    <li>Boarding Time: Pay attention to the boarding time mentioned on your boarding pass or announced at the gate. Be present at the boarding gate well in advance to avoid any delays.</li>
                    <li>Boarding Pass: Ensure you have your boarding pass ready, either in digital or printed format. Present it to the gate agent upon boarding.</li>
                    <li>Priority Boarding: If you are eligible for priority boarding, such as passengers with special needs, families with young children, or frequent flyers, listen for the announcement or approach the gate agent for assistance.</li>
                    <li>Follow Instructions: Listen to the boarding announcements and follow the instructions provided by the boarding crew. Respect the designated boarding zones or groups to maintain an orderly boarding process.</li>
                    <li>Cabin Baggage: Adhere to the cabin baggage limitations specified by Kemsi Airlines. Store your carry-on baggage in the overhead compartments or under the seat in front of you, ensuring it does not obstruct the aisles or emergency exits.</li>
                </ul>
                
                <p>Thank you for choosing Kemsi Airlines. We hope you have a pleasant journey with us!</p>
            </div>
        </div>

    )
}
