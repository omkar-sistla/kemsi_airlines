import { createContext, useState } from "react";
export const JourneyContext = createContext();
export const JourneyProvider=({children})=>{
    const [bookingId,setBookingId] = useState("");
    const [journey, setJourney] = useState({});
    return (
        <JourneyContext.Provider value={{setBookingId,bookingId,journey,setJourney}}>
        {children}
        </JourneyContext.Provider>
    );
};