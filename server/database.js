import mysql from "mysql";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sistla@1974",
    database:"kemsi_airlines"
})