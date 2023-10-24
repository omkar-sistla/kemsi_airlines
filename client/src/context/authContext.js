import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [currentToken, setCurrentToken]=useState();
    const authorize = async() =>{
        const res = await axios.get("https://kemsi-airlines-backend.vercel.app/",{
            withCredentials:true
        });
        console.log(res.data);
        res.data.Status ? setCurrentToken(res.data.Status) : setCurrentToken(false);
        res.data.user ? setUser(res.data.user) : setUser(false);
        console.log(currentToken);
    }
    useEffect(()=>{
        authorize();
    },[currentToken]);


    const login = async (signInValues) => {
        await axios.post("https://kemsi-airlines-backend.vercel.app/login", signInValues, { 
            withCredentials: true 
        });
    };
    const logout = async() => {
        await axios.post("https://kemsi-airlines-backend.vercel.app/logout",{
            withCredentials: true
        });
    }
    

    return (
        <AuthContext.Provider value={{ login, logout, authorize, currentToken, user}}>
            {children}
        </AuthContext.Provider>
    );
};