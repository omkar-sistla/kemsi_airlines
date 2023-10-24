import { db } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const env = dotenv.config();

export const register = async (req, res) => {
    try {
        const {email, pass, firstName, lastName} = req.body;
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
            res.status(404).json("User already exists");
        } 
        else {
            const hashedPassword = await bcrypt.hash(pass, 10);
            const insertUserQuery = `
                INSERT INTO 
                users (Email, Password, FirstName, LastName) 
                VALUES 
                (
                    '${email}',
                    '${hashedPassword}',
                    '${firstName}',
                    '${lastName}'
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
            res.status(200).json("User Created Successfully");
        }
    } catch (error) {
        return res.status(500).json({error:"internal"});
    }
};

export const login = async(req,res) => {
    try{
        const{email, pass} = req.body;
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
        if (user===undefined){
            return res.status(404).json("Invalid email");
        } else{
            const isPasswordsMatched = await bcrypt.compare(pass,user.Password);
            console.log(isPasswordsMatched)
            if (isPasswordsMatched === false){
                res.status(404).json("Invalid Password");
            } else{
                const secret_string = process.env.SECRET_STRING
                const {Password,...others}=user;
                const token = jwt.sign({ user: others },secret_string);
                
                const options ={
                    expires: new Date(Date.now() + 60 * 1000),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                }
                res.cookie("accessToken",token,options).status(200).json(others);
            }         
        }
    } catch (error) {
        return res.status(500).json({error:"internal"});
    }
};


export const logout = (req, res) => {
    const options = {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }
    res.clearCookie('accessToken',options);
    return res.status(200).json("User has been logged out.")
};

export const verifyUser = async(req,res,next)=>{
    const token = await req.cookies.accessToken;
    if(!token){
        return res.json("Please Login");
    } else{
        jwt.verify(token, process.env.SECRET_STRING, (err, decoded) =>{
            if(err){
                return res.json({Error : "Wrong token"});
            } else{
                req.user = decoded.user;
                next();  
            }
        });
    }
}
export const authorize = (verifyUser,(req,res)=>{
    return res.json({Status:"Success", user: req.user});
})
