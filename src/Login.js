import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
    const [state, dispatch] = useStateValue();
    const [fadeOut, setFadeOut] = useState(false); // State to control fade-out class

 const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        console.log(result);

        // Check if the user exists in the "users" collection
        const userRef = db.collection('users').doc(result.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          // If the user does not exist, create a new document in the "users" collection
          await userRef.set({
            displayName: result.user.displayName,
            email: result.user.email,
            channels:[],
            // Add other user details as needed
          });
        }

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

    return (
        <div className={`login ${fadeOut ? 'fade-out' : ''}`} style={{ backgroundImage:`url(${require('./bg1.jpg')})` }}>
            <div className='Login__container'>
                <img src="https://www.sketchappsources.com/resources/source-image/new-slack-logo-nicolas-ciotti.jpg" alt="SLACK" />
                <h5>Sign in to ProSlack</h5>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;
