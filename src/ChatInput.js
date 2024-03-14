import React, { useState } from 'react';
import "./ChatInput.css";
import db from "./firebase"
import { useStateValue } from './StateProvider';
import SendIcon from '@mui/icons-material/Send';
import { serverTimestamp, getDocs, deleteDoc } from 'firebase/firestore';
import { Clear } from '@mui/icons-material';

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
    const clearChat = async () => {
        try {
            const messagesSnapshot = await getDocs(db.collection('rooms').doc(channelId).collection('messages'));
            messagesSnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
            console.log("Chat cleared successfully!");
        } catch (error) {
            console.error("Error clearing chat:", error);
        }
    };

    return (
        <div className='chatInput'>
            
            <div className='message-form'>
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Type here to message in #${channelName?.toLowerCase()}`}
                    className='input-field'
                />
            </form>
            </div>
            
            <div className='button1'>
                <button type="submit" onClick={sendMessage} className='send-button'><SendIcon/></button>
                
            </div>

            <div className='button2'>
            <button type="button" onClick={clearChat} className='clear-button'><Clear/></button>
            </div>

        </div>
    );
}

export default ChatInput;
