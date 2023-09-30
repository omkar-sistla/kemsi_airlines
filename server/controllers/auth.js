import { db } from "../database.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const {email, password, first_name, last_name} = req.body;
        console.log(email);
        const findUserquery = `SELECT * FROM users WHERE Email = '${email}'`;
        const user = await new Promise((resolve, reject) => {
            db.query(findUserquery,(error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        console.log(user)
        if (user.length!==0){
            res.status(400).send("User already exists");
        } 
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertUserQuery = `
                INSERT INTO 
                users (Email, Password, FirstName, LastName) 
                VALUES 
                (
                    '${email}',
                    '${hashedPassword}',
                    '${first_name}',
                    '${last_name}'
                );`;
            await new Promise((resolve,reject) => {
                db.query(insertUserQuery,(error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            // await db.run(insertUserQuery);
            res.status(200).send("User Created Successfully");
        }
    } catch (error) {
        return res.status(500).json({error:"internal"});
    }
};

export const login = async(req,res) => {
    try{
        const{email, password} = req.body;
        const loginQuery = `Select * from users WHERE Email = '${email}'`
        const user=await new Promise((resolve,reject)=>{
            db.query(loginQuery,(error,results)=>{
                if(error){
                    reject(error);
                } else{
                    resolve(results[0]);
                }
            });
        });
        console.log(user);
        if (user.length===0){
            res.status(404).send("Invalid User");
        } else{
            const isPasswordsMatched = await bcrypt.compare(password,user.Password);
            console.log(isPasswordsMatched)
            if (isPasswordsMatched === false){
                res.status(404).send("Invalid Password");
            } else{
                res.status(200).json(user);
            }
        }

    } catch (error) {
        return res.status(500).json({error:"internal"});
    }
}
