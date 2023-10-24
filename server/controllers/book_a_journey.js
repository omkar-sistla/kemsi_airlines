import { db } from "../database.js";
export const bookJourney = async(req,res)=>{
    try{
        const {email,from_city,to_city,booked_date,depart_date,tickets_array,passengers_array}=req.body;
        const bookJourneyQuery = 
        `Insert into 
        Bookings (booking_email, contact_email, From_City, To_City, Booked_Date, Depart_Date, Arrival_Date)
        Values(
            '${email}',
            '${email}',
            '${from_city}',
            '${to_city}',
            '${booked_date}',
            '${depart_date}',
            '${depart_date}'
        );`;
        const bookingResults = await new Promise((resolve, reject) => {
            db.query(bookJourneyQuery,(error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        const bookingId = bookingResults.insertId;

        // for (const ticket of tickets_array){
        //     const {flight_no,depart_date,ticket_class} = ticket;
        //     const addTicketsQuery=
        //     `Insert into 
        //     Tickets(Booking_Id, flight_no, Depart_Date, Arrival_Date, No_Passengers, Class)
        //     Values(
        //         '${bookingId}',
        //         '${flight_no}',
        //         '${depart_date}',
        //         '${depart_date}',
        //         '${passengers_array.length}',
        //         '${ticket_class}'
        //     );`;
        //     await new Promise((resolve,reject) => {
        //         db.query(addTicketsQuery,(error,results)=>{
        //             if(error){
        //                 reject(error);
        //             } else{
        //                 resolve(results)
        //             }
        //         })
        //     });
        // }

        // for (const passenger of passengers_array){
        //     const{name,age,gender,email,mobile}=passenger;
        //     const addPassengersQuery = 
        //     `
        //     Insert into
        //     Passengers(Booking_Id, Passenger_Name, Passenger_Age, Passenger_Gender, Passenger_Email, Passenger_Mobile)
        //     Values(
        //         '${bookingId}',
        //         '${name}',
        //         '${age}',
        //         '${gender}',
        //         '${email}',
        //         '${mobile}'
        //     );`;
        //     await new Promise((resolve,reject) => {
        //         db.query(addPassengersQuery,(error,results)=>{
        //             if(error){
        //                 reject(error);
        //             } else{
        //                 resolve(results)
        //             }
        //         })
        //     });
        // }
        res.json("booking successful");
    } catch(error){
        return res.status(500).json({error:"internal"});
    }
};