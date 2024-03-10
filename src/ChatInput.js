import React, { useState } from 'react';
import "./ChatInput.css";
import db from "./firebase"
import { useStateValue } from './StateProvider';
import { serverTimestamp} from 'firebase/firestore';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');

    const [{ user }] = useStateValue();
 
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('sendMessage function called');

        if (channelId) {
            db.collection('rooms').doc(channelId).collection('messages').add({
                message: input,
                timestamp: serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            })
            .then(() => {
                setInput(""); // Reset the input after successful message submission
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
        }
    };

    return (
        <div className='chatInput'>
            
            
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Type here to message in #${channelName?.toLowerCase()}`}

                />
                <button type="submit" onClick={sendMessage} className='send-button'><SendIcon/></button>
            </form>

        </div>
    );
}

export default ChatInput;
