import React from "react";
import NavBar from "../components/nav_bar/nav_bar";
export default function Inflight() {
    window.scrollTo(0,0);
    return(
        <div className="guidelinepage">
            <NavBar/>
            <img src="./assets/images/inflight_page.jpg" className="cover" alt="ok"/>
            <div className="guidelines">
                <h1>In-Flight Guidelines</h1>            
                <h2>Safety First</h2>
                <ul>
                    <li>Seatbelts: Please keep your seatbelt fastened whenever you are seated, even when the seatbelt sign is off. Ensure that the seatbelt is securely fastened low across your lap.</li>
                    <li>Electronic Devices: Follow the crew's instructions regarding the use of electronic devices such as smartphones, tablets, and laptops during different phases of the flight. Please switch them to airplane mode or turn them off during takeoff and landing.</li>
                    <li>Cabin Baggage: Store your cabin baggage in the overhead compartments or under the seat in front of you, ensuring that the aisles and exits remain clear. Please follow the crew's instructions regarding size and weight limitations.</li>
                    <li>Smoking: Smoking, including the use of electronic cigarettes, is strictly prohibited on all Kemsi Airlines flights, in accordance with international regulations.</li>
                    <li>Emergency Procedures: Pay attention to the safety demonstration provided by the cabin crew and familiarize yourself with the location of emergency exits, oxygen masks, and life vests. In the event of an emergency, follow the crew's instructions promptly.</li>
                </ul>           
                <h2>Comfort and Courtesy</h2>
                <ul>
                    <li>Seat Etiquette: Be considerate of other passengers by refraining from reclining your seat excessively, especially during meal times or when the person behind you is using a tray table.</li>
                    <li>Noise and Volume: Please keep noise levels to a minimum, especially during nighttime flights, and use headphones when listening to audio or watching entertainment.</li>
                    <li>Cabin Lighting: Follow the crew's instructions regarding cabin lighting, including dimming or turning off lights during specific periods, such as overnight flights.</li>
                    <li>Meal and Beverage Service: Please remain seated with your seatbelt fastened during meal and beverage service. When the crew is passing through the cabin, avoid blocking the aisles.</li>
                    <li>Restroom Courtesy: Be mindful of others when using the lavatories by keeping your visits as brief as possible. Follow any instructions or restrictions provided by the crew.</li>
                </ul>           
                <h2>Health and Hygiene</h2>
                <ul>
                    <li>Illness or Contagious Conditions: If you are feeling unwell or have a contagious condition, we recommend postponing your travel plans. Consult a medical professional before flying if you have any concerns.</li>
                    <li>Mask Usage: Follow any mask requirements in place by Kemsi Airlines or regulatory authorities. Wear your mask properly, covering your nose and mouth, throughout the flight, unless eating or drinking.</li>
                    <li>Hand Hygiene: Maintain good hand hygiene by regularly washing your hands with soap and water, or using hand sanitizer provided onboard.</li>
                    <li>Sickness during Flight: If you feel unwell during the flight, please notify a crew member, who will provide assistance and medical support if needed.</li>
                </ul>            
                <p><strong>Note:</strong> Kemsi Airlines reserves the right to refuse transportation or take necessary action if a passenger fails to comply with the in-flight guidelines or poses a risk to the safety and comfort of others.</p>           
                <p>Thank you for choosing Kemsi Airlines. We appreciate your cooperation in making your journey with us pleasant and safe.</p>
            </div>
        </div>

    )
}
