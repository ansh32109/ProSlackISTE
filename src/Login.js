import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import{auth,provider} from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
    const[state,dispatch]=useStateValue();
const signIn = () =>{
    auth
    .signInWithPopup(provider)
    .then((result)=>{console.log(result);
    dispatch({type:actionTypes.SET_USER,
    user:result.user,
    })})
    .catch((error)=>{alert(error.message);});
}

    return <div className="login">
        <div className='Login__container'>
            <img src="https://www.sketchappsources.com/resources/source-image/new-slack-logo-nicolas-ciotti.jpg" alt="SLACK" />
         <h5>Sign in to SLACK</h5>
         
         <Button onClick={signIn}>Sign in with Google</Button>
        
        </div>

    </div>
}

export default Login;