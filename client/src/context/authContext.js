import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [currentToken, setCurrentToken]=useState();
    const authorize = async() =>{
        const res = await axios.get("http://localhost:3000/",{
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
        await axios.post("http://localhost:3000/login", signInValues, { 
            withCredentials: true 
        });
    };
    const logout = async() => {
        await axios.get("http://localhost:3000/logout",{
            withCredentials: true
        });
    }
    

    return (
        <AuthContext.Provider value={{ login, logout, authorize, currentToken, user}}>
            {children}
        </AuthContext.Provider>
    );
};