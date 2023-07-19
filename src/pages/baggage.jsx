import React from "react";
import "./guidelines.css"
import NavBar from "../components/nav_bar/nav_bar";
export default function Baggage() {
    return(
        <div className="guidelinepage">
            <NavBar/>
            <img src="./assets/images/baggage_page.jpg" className="cover" alt="ok"/>
            <div className="guidelines">
                <h1>Baggage Allowance Guidelines</h1> 
                <h2>Carry-On Baggage:</h2>
                <ul>
                    <li>Each passenger is allowed to bring one carry-on bag and one personal item on board.</li>
                    <li>The maximum dimensions for the carry-on bag are 22 x 14 x 9 inches (56 x 36 x 23 cm).</li>
                    <li>The weight limit for the carry-on bag is 15 pounds (7 kg).</li>
                    <li>Liquids in carry-on bags must comply with the TSA regulations, with containers not exceeding 3.4 ounces (100 milliliters) in volume.</li>
                    <li>Personal electronic devices such as laptops, tablets, and smartphones are allowed in the cabin and should be easily accessible during security checks.</li>
                </ul>

                <h2>Checked Baggage:</h2>
                <ul>
                    <li>Economy Class:</li>
                    <ul>
                    <li>Passengers are allowed one checked bag.</li>
                    <li>The weight limit for the checked bag is 50 pounds (23 kg).</li>
                    <li>The linear dimensions (length + width + height) should not exceed 62 inches (158 cm).</li>
                    </ul>
                    <li>Business Class:</li>
                    <ul>
                    <li>Passengers are allowed two checked bags.</li>
                    <li>The weight limit for each checked bag is 70 pounds (32 kg).</li>
                    <li>The linear dimensions (length + width + height) should not exceed 62 inches (158 cm).</li>
                    </ul>
                    <li>First Class:</li>
                    <ul>
                    <li>Passengers are allowed two checked bags.</li>
                    <li>The weight limit for each checked bag is 70 pounds (32 kg).</li>
                    <li>The linear dimensions (length + width + height) should not exceed 62 inches (158 cm).</li>
                    </ul>
                </ul>

                <h2>Oversized and Overweight Baggage:</h2>
                <ul>
                    <li>Bags that exceed the weight or size limits will be subject to additional fees.</li>
                    <li>Overweight bags:</li>
                    <ul>
                    <li>Bags weighing more than the specified weight limit will incur an excess weight fee per pound/kilogram.</li>
                    <li>The maximum weight for any bag is 100 pounds (45 kg).</li>
                    </ul>
                    <li>Oversized bags:</li>
                    <ul>
                    <li>Bags with linear dimensions exceeding 62 inches (158 cm) will incur an oversize fee.</li>
                    <li>The maximum dimensions for oversized bags are 80 inches (203 cm) in length.</li>
                    </ul>
                </ul>

                <h2>Special Items:</h2>
                <ul>
                    <li>Sports Equipment:</li>
                    <ul>
                    <li>Sports equipment, such as golf clubs, skis, and surfboards, is subject to specific guidelines.</li>
                    <li>Additional fees may apply, and advance notice is required.</li>
                    </ul>
                    <li>Musical Instruments:</li>
                    <ul>
                    <li>Musical instruments can be transported as carry-on or checked baggage.</li>
                    <li>Instruments should be properly packed and meet the size and weight restrictions.</li>
                    </ul>
                    <li>Fragile Items:</li>
                    <ul>
                    <li>Fragile items should be appropriately packed and labeled as fragile.</li>
                    <li>Consider carrying delicate items as carry-on baggage.</li>
                    </ul>
                </ul>

                <h2>Electronics:</h2>
                <ul>
                    <li>Personal electronic devices such as laptops, tablets, and smartphones are allowed in both carry-on and checked baggage.</li>
                    <li>It is recommended to carry valuable or fragile electronics in your carry-on bag to ensure their safety.</li>
                    <li>Ensure that all electronics are securely packed and protected during transport.</li>
                </ul>
            </div>           
        </div>
    )
};