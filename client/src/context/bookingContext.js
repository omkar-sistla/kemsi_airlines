import { createContext,useState } from "react";
export const BookingContext = createContext();
export const BookingProvider=({children})=>{
    const [passengers, setPassengers] = useState([]);
    const [bookedRoute, setBookedRoute] = useState();

    return (
        <BookingContext.Provider value={{ passengers, setPassengers, bookedRoute, setBookedRoute }}>
        {children}
        </BookingContext.Provider>
    );
};