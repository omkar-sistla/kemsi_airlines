import React, { useContext, useState } from "react";
import NavBar from "../components/nav_bar/nav_bar";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "./login.css";

function NameInput(props){
    return(
        <div id="name_input">
            <label>NAME</label>
            <div className="name">
                <input type="text" id="firstname" name="firstname" placeholder="First Name/Given Name" onChange={props.fchange}/>
                <input type="text" id="lastname" name="lastname" placeholder="Last Name/Surname" onChange={props.lchange}/>
            </div>           
        </div>
    )
}
function InputContainer(props){
    return(
        <div className="input_container">
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} className={props.class} onChange={props.onChange}/>
        </div>
    )
}
export default function LoginExpress(){
    const[signup, setsignup] = useState(false); //to switch between signup form and signin form
    const [errorMsg, setErrorMsg]=useState(""); //to set the error message in the form
    const [submitDisable, setSubmitDisable] = useState(false); //to disable the submit button while running operation on server

    const[signInValues, setSignInValues] = useState({
        email:"",
        pass:"",
    })


    const [signUpValues, setSignUpValues] = useState({
        firstName: "",
        lastName:"",
        email:"",
        pass:"",
        confPass:""
    })

    const {login}=useContext(AuthContext); //login function imported from authcontext

    //function for signing in
    const handleSignInSubmission=async(e)=>{
        e.preventDefault();
        if (!signInValues.email || !signInValues.pass){
            setErrorMsg("Fill all the fields");
            return;
        }
        setErrorMsg("");
        setSubmitDisable(true);
        try{
            await login(signInValues);            
        } catch(err){
            setErrorMsg(err.response.data);
            console.log(errorMsg);
        }
        setSubmitDisable(false);  
        window.location.href="/";
    };

    //function for regestering
    const handleSignUpSubmission= async(e)=>{
        e.preventDefault();

        //telling user to fill all the fields
        if (!signUpValues.firstName || !signUpValues.lastName || !signUpValues.email || !signUpValues.pass){
            setErrorMsg("Fill all the fields");
            return;
        }

        //strong password error
        if (signUpValues.pass.length < 8 || !/[A-Z]/.test(signUpValues.pass) || !/[a-z]/.test(signUpValues.pass) || !/[0-9]/.test(signUpValues.pass) || !/[!@#$%^&*]/.test(signUpValues.pass)) {
            setErrorMsg("Password should have a minimum of 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 numerical digit, and 1 special character");
            return;
        }

        //password mismatch
        if (signUpValues.pass !== signUpValues.confPass){
            setErrorMsg("Passwords not matched");
            return;
        }

        setErrorMsg("");//reset the error message
        setSubmitDisable(true); //disable the submit button

        //request to server
        try{
            await axios.post("http://localhost:3000/register",signUpValues,{withCredentials: true} );
        } catch(err){
            setErrorMsg(err.response.data);
            console.log(err);
        }
         
        setSubmitDisable(false);
    }
    const ToggleSignup = () => {
        setsignup(!signup);
        setErrorMsg("");
    }

    //finally it is the login page
    return(
        <div id="login_page"> 
            <NavBar/>      
            <form className={signup ? "login_form inactive" : 'login_form'}>
                <h2>SIGN IN EXPRESS</h2>
                <InputContainer label="EMAIL/USERNAME" type="text" placeholder="EMAIL/USERNAME" 
                onChange={(e)=> setSignInValues((prev)=>({...prev, email:e.target.value}))}/>

                <InputContainer label="PASSWORD" type="password" name="username" placeholder="PASSWORD" 
                onChange={(e)=> setSignInValues((prev)=>({...prev, pass:e.target.value}))}/>
                <a href="/#" id="forgot_password">Forgot Password?</a>
                <b className="error_message">{errorMsg}</b>
                <button type="button" onClick={handleSignInSubmission} disabled={submitDisable}>SIGN IN</button>               
                <hr/>
                <div className="input_container">
                    <label>Dont have an account ?</label>
                    <button onClick={ToggleSignup} type="button">Create New Account</button>
                </div>                
            </form>
            <form className={signup ? "signup_form active" : 'signup_form'}>
                <h2>SIGN UP EXPRESS</h2>
                <NameInput 
                    fchange={(event) => 
                        setSignUpValues((prev) => 
                        ({ ...prev, firstName: event.target.value})
                        )
                    }
                    lchange={(event) => 
                        setSignUpValues((prev) => 
                        ({ ...prev, lastName: event.target.value})
                        )
                    }
                />
                <InputContainer label="EMAIL/USERNAME" type="text" placeholder="EMAIL/USERNAME" 
                    onChange = {(event) => 
                    setSignUpValues((prev) => 
                    ({ ...prev, email: event.target.value})
                    )
                }
                />
                <InputContainer label="PASSWORD" type="password" name="username" placeholder="PASSWORD"
                    onChange = {(event) => 
                    setSignUpValues((prev) => 
                    ({ ...prev, pass: event.target.value})
                    )
                }
                />
                <InputContainer label="CONFIRM PASSWORD" type="password" name="username" placeholder="CONFIRM PASSWORD"
                    onChange = {(event) => 
                    setSignUpValues((prev) => 
                    ({ ...prev, confPass: event.target.value})
                    )
                }
                />
                <b className="error_message">{errorMsg}</b>
                <button type="button" onClick={handleSignUpSubmission} disabled={submitDisable}>SIGN UP</button>
                <hr/>
                <div className="input_container">
                    <label>Existing User?</label>
                    <button onClick={ToggleSignup} type="button">Click To SIGN IN</button>
                </div>     
            </form>
        </div>        
    )
}
export{InputContainer};

