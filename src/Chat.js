import React,{useState, useEffect} from 'react'
import "./Chat.css";
import ChatInput from './ChatInput.js'
import {useParams} from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import db from "./firebase";
import Message from './Message';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

function Chat() {
    const { roomId } = useParams();
    const[roomDetails,setRoomDetails]= useState(null)
    const[roomMessages,setRoomMessages]=useState([])

 useEffect(() => {
    if(roomId) {
 db.collection('rooms')
    .doc(roomId)
    .onSnapshot(snapshot =>(
    setRoomDetails(snapshot.data())));
 }},[roomId])

 db.collection('rooms').doc(roomId)
 .collection('messages')
 .orderBy('timestamp','asc')
 .onSnapshot((snapshot)=>
    setRoomMessages(
        snapshot.docs.map(doc => doc.data())
    ))
 

  console.log(roomDetails);
  console.log("MESSAGES",roomMessages);

  return (  
    <div className = "chat">
        <h2> You are in the {roomId} room</h2>
        <div className='chat__header'>
          <div className='chat__headerLeft'>
            <h4 className='chat__ChannelName'> 
               <strong> #{roomDetails?.name} </strong>
               <StarBorderOutlinedIcon/>
            </h4>
          </div>
          <div className='chat__headerRight'>
           <p>
            <InfoOutlinedIcon/> Details
           </p>
          </div>
        </div>
        <div className="chat__messages">
            {roomMessages.map(({message,timestamp,user,userImage}) =>
             (  
                <Message
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}/>
              ))}
        
        </div>
        <ChatInput
          channelName = {roomDetails?.name}
          channelId = {roomId}
        />
        
    </div>
  
  );
}

export default Chat