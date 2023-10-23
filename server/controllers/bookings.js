// bookings controller
import { db } from "../database.js";

export const getUpcomingBookings = async (req, res) => {
    try {
        const { email } = req.body;
        const bookingQuery = 
            `SELECT DISTINCT
            bookings.Booking_Id,
            bookings.From_City,
            bookings.To_City,
            bookings.Depart_Date,
            bookings.Arrival_Date,
            bookings.Booked_Date,
            bookings.Status
            FROM bookings 
            WHERE 
            bookings.booking_email='${email}'
            and 
            bookings.Depart_Date >= CURDATE()
            and
            bookings.Status = "Confirmed"`;

        const bookings = await new Promise((resolve, reject) => {
            db.query(bookingQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results); // Assuming you want the first result
                }
            });
        });

        if (bookings) {
            console.log(bookings);
            res.send(bookings); // Send the response
        } else {
            res.send("You haven't made any flight bookings yet."); // Modify this message as needed
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCompletedBookings = async (req, res) => {
    try {
        const { email } = req.body;
        const bookingQuery = 
            `SELECT DISTINCT
            bookings.Booking_Id,
            bookings.From_City,
            bookings.To_City,
            bookings.Depart_Date,
            bookings.Arrival_Date,
            bookings.Booked_Date
            FROM bookings 
            WHERE 
            bookings.booking_email='${email}'
            and 
            bookings.Depart_Date < CURDATE()            
            and
            bookings.Status = "Confirmed"`;

        const bookings = await new Promise((resolve, reject) => {
            db.query(bookingQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results); // Assuming you want the first result
                }
            });
        });

        if (bookings) {
            console.log(bookings);
            res.send(bookings); // Send the response
        } else {
            res.send("You haven't made any flight bookings yet."); // Modify this message as needed
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCancelledBookings = async(req,res) =>{
    try {
        const { email } = req.body;
        const bookingQuery = 
            `SELECT DISTINCT
            bookings.Booking_Id,
            bookings.From_City,
            bookings.To_City,
            bookings.Depart_Date,
            bookings.Arrival_Date,
            bookings.Booked_Date
            FROM bookings 
            WHERE 
            bookings.booking_email='${email}'          
            and
            bookings.Status = "Cancelled"`;

        const bookings = await new Promise((resolve, reject) => {
            db.query(bookingQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results); // Assuming you want the first result
                }
            });
        });

        if (bookings) {
            console.log(bookings);
            res.send(bookings); // Send the response
        } else {
            res.send("You haven't made any flight bookings yet."); // Modify this message as needed
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export const getBookingDetails = async(req,res)=>{
    const bookingDetails ={tickets:[],passengers:[]}
    try{
        const {Booking_Id} = req.body;
        const ticketsQuery = 
        `Select Distinct
        tickets.Ticket_Id,
        tickets.flight_no,
        tickets.Depart_Date,
        tickets.class,
        flights.start_city,
        flights.end_city,
        flights.departure_time,
        flights.flight_duration,
        ADDTIME(flights.departure_time, flights.flight_duration) AS arrival_time
        from 
        tickets join flights 
        on 
        tickets.flight_no=flights.flight_no
        Where
        tickets.Booking_Id = '${Booking_Id}';`;
        const tickets = await new Promise((resolve, reject) => {
            db.query(ticketsQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const passengersQuery = 
        `Select * 
        From passengers
        Where
        passengers.Booking_Id = '${Booking_Id}';`;
        const passengers = await new Promise((resolve, reject) => {
            db.query(passengersQuery, (error, results) =>{
                if (error){
                    reject(error);
                } else{
                    resolve(results);
                }
            })
        })
        bookingDetails.tickets=tickets;
        bookingDetails.passengers=passengers;
        if (tickets){
            res.send(bookingDetails);
        } else{
            res.send("Unexpected Error");
        }
    } catch(error){
        res.status(500).send(error.message);
    }

}

export const cancelBookings = async (req, res) => {
    const { Booking_Id } = req.body;
    console.log(Booking_Id);
    const cancelQuery = `
        UPDATE bookings
        SET Status = "Cancelled"
        WHERE Booking_Id = '${Booking_Id}';`;
    try {
        await new Promise((resolve, reject) => {
            db.query(cancelQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        res.status(200).send("Cancelled Successfully");
    } catch (error) {
        res.status(500).send("Internal Error");
    }
};





