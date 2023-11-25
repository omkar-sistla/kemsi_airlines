import { db } from "../database.js";

export const getFlights = async (req, res) => {
    try {
        const flights = [];
        const start_city=req.query.start_city;
        const end_city=req.query.end_city;
        const query1 = 
        `SELECT DISTINCT
            1 as stops,
            f.start_city as start_city,
            f.end_city as end_city,
            f.flight_no as flight_no,
            f.departure_time as start_time,
            ADDTIME(f.departure_time, f.flight_duration) AS arrival_time,
            f.economy as economy_price,
            f.business_class AS business_price,
            f.first_class AS first_class_price 
        FROM 
            flights f
        WHERE
            start_city=? 
            AND end_city=?`;
        const results1 = await new Promise((resolve, reject) => {
            db.query(query1,[start_city,end_city], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    
        flights.push(results1);

        const query2 = 
        `SELECT DISTINCT
            2 as stops,
            f1.start_city AS start_city,
            f2.start_city AS transfer_city,
            f2.end_city AS end_city,
            f1.flight_no AS first_flight_no,
            f2.flight_no AS second_flight_no,
            f1.departure_time AS start_time,
            ADDTIME(f1.departure_time, f1.flight_duration) AS first_arrival_time,
            subtime(f2.departure_time,ADDTIME(f1.departure_time, f1.flight_duration)) as layoff,
            f2.departure_time as second_start_time,
            ADDTIME(f2.departure_time, f2.flight_duration) AS second_arrival_time,
            round((f1.economy+f2.economy)/2) as economy_price,
            round((f1.business_class+f2.business_class)/2) AS business_price,
            round((f1.first_class+f2.first_class)/2) AS first_class_price
        FROM
            flights f1
        JOIN 
            flights f2 ON f1.end_city = f2.start_city
        WHERE
            f1.start_city = ?
            AND f2.end_city = ?
            AND f2.departure_time > ADDTIME(f1.departure_time, ADDTIME(f1.flight_duration,"01:00:00"))`; 

        const results2 = await new Promise((resolve, reject) => {
            db.query(query2,[start_city,end_city], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        flights.push(results2);

        const query3=
        `select distinct 
            3 as stops,
            f1.start_city as start_city,
            f1.end_city as first_transfer_city,
            f2.end_city as second_transfer_city,
            f3.end_city as end_city,
            f1.flight_no as first_flight_no,
            f2.flight_no as second_flight_no,
            f3.flight_no as third_flight_no,
            f1.departure_time AS start_time,
            ADDTIME(f1.departure_time, f1.flight_duration) AS first_arrival_time,
            subtime(f2.departure_time,ADDTIME(f1.departure_time, f1.flight_duration)) as first_layoff,
            f2.departure_time as second_start_time,
            ADDTIME(f2.departure_time, f2.flight_duration) AS second_arrival_time,
            subtime(f3.departure_time,ADDTIME(f2.departure_time, f2.flight_duration)) as second_layoff,
            f3.departure_time as third_start_time,
            ADDTIME(f3.departure_time, f3.flight_duration) AS third_arrival_time,
            round((f1.economy+f2.economy+f3.economy)/3) as economy_price,
            round((f1.business_class+f2.business_class+f3.business_class)/3) AS business_price,
            round((f1.first_class+f2.first_class+f3.first_class)/3) AS first_class_price
        from 
            flights as f1 
        join 
            flights as f2 
        join 
            flights as f3 
            on f1.end_city=f2.start_city and f2.end_city=f3.start_city
        where 
            f1.start_city=? 
            and f3.end_city=?
            and f2.departure_time>=addtime(f1.departure_time,ADDTIME(f1.flight_duration,"00:45:00"))
            and f3.departure_time>=addtime(f2.departure_time,ADDTIME(f2.flight_duration,"00:45:00"))
            and f2.end_city!= f1.start_city
            and f3.end_city!= f2.start_city
            and f3.end_city!= f1.start_city;`

        const results3 = await new Promise((resolve, reject) => {
            db.query(query3, [start_city,end_city], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        flights.push(results3);
        res.send(flights);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

