  import React,{useState, useEffect} from 'react'
  import "./Chat.css";
  import ChatInput from './ChatInput.js'
  import {useParams} from "react-router-dom";
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import DustbinIcon from '@mui/icons-material/DeleteOutlined';
  import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
  import db from "./firebase";
  import Message from './Message';
  import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
  import { useNavigate } from 'react-router-dom';

  function Chat() {
      const { roomId } = useParams();
      const[roomDetails,setRoomDetails]= useState(null)
      const[roomMessages,setRoomMessages]=useState([])
      const [search,setSearch]=useState("")
      const navigate = useNavigate();
      const deleteChannel = ()=> {
        if(roomDetails?.name){
          db.collection('rooms').doc(roomId).delete()
          .then(() => {
            console.log("Channel successfully deleted!");
            // eslint-disable-next-line no-restricted-globals
            navigate('/');
        })
        .catch((error) => {
            console.error("Error removing channel: ", error);
        });
        }
      }

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
            <form>
        <input 
          type="text" 
          id="search" 
          name="search" 
          style={{ border: "1px solid black" }} 
          placeholder='search messages'
          onChange={(e) => setSearch(e.target.value)}
          value={search} // Add value attribute to reflect the state
      />
      </form>
            
            <button className = "delete_button" onClick={deleteChannel} title='Delete Channel'>
            <DustbinIcon/>
            </button>
            <p>
            <InfoOutlinedIcon className='info-button'/>
            </p>
            </div>
          </div>
          <div className="chat__messages">
          {roomMessages
    .filter(({ message }) => {
      // Convert both the message and search string to lowercase for case-insensitive matching
      const lowerCaseMessage = message.toLowerCase();
      const lowerCaseSearch = search.toLowerCase();
      // Check if the lowercased message starts with the lowercased search string
      return lowerCaseMessage.startsWith(lowerCaseSearch);
    })
    .map(({ message, timestamp, user, userImage }) => (
      <Message
        key={timestamp} // assuming timestamp is unique for each message
        message={message}
        timestamp={timestamp}
        user={user}
        userImage={userImage}
      />
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