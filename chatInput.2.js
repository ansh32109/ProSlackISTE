import React, { useState } from "react";
import db from "./firebase";
import ".chatInput.css";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";


function chatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = (e) =>{
        e.preventDefault();
        
        if (channelId) {
            db.collection("rooms").doc(channelId).collection({
                message: input,
                timestamp: firebase.firestore.FieldlValue.server,
                user: user.displayName,                           
                userImage: user.photpURL,

            });       
      }
    };
    
  return (
    <div className="chatInput">
        <form>
            <input
                value={input}
                
                onChange={(e) => setInput(e.target.value)}
                placeholder={'Message #${channelName?.toLowerCase()}'} />    
                    
                <button type="submit" onClick={sendMessage}>
                    SEND
                </button>

            </form>

        </div>
    );


    

}  