  import React,{useState, useEffect} from 'react'
  import "./Chat.css";
  import ChatInput from './ChatInput.js'
  import {useParams} from "react-router-dom";
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import DustbinIcon from '@mui/icons-material/DeleteOutlined';
  import Tooltip from '@mui/material/Tooltip';
  import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
  import db from "./firebase";
  import Message from './Message';
  import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
  import { useNavigate } from 'react-router-dom';
  

  function Chat() {
      const { roomId } = useParams();
      const[roomDetails,setRoomDetails]= useState(null)
      const[roomMessages,setRoomMessages]=useState([])
      const [creatorName, setCreator] = useState("");
      const [search,setSearch]=useState("")
      const navigate = useNavigate();
      const deleteChannel = ()=> {
        if(roomDetails?.name){
          db.collection('rooms').doc(roomId).delete()
          .then(() => {
            console.log("Channel successfully deleted!");
            
            navigate('/');
        })
        .catch((error) => {
            console.error("Error removing channel: ", error);
        });
        }
      }


      useEffect(() => {
        if (roomId) {
          const unsubscribeRoomDetails = db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => {
              setRoomDetails(snapshot.data());
            });
      
          
          const fetchCreatorData = async () => {
            try {
              const roomDoc = await db.collection('rooms').doc(roomId).get();
              const creatorData = roomDoc.data()?.creator;
              setCreator(creatorData);
            } catch (error) {
              console.error('Error fetching creator data:', error);
            }
          };
      
          fetchCreatorData(); 
      
          return () => {
            unsubscribeRoomDetails(); 
          };

          
        }
      }, [roomId]);
      

  
  

  

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
          <div className='chat__header'>
            <div className='chat__headerLeft'>
              <h4 className='chat__ChannelName'> 
                <strong> #{roomDetails?.name} </strong>
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
          value={search} 
      />
      </form>
            
            <button className = "delete_button" onClick={deleteChannel} title='Delete Channel'>
            <DustbinIcon/>
            </button>
            <Tooltip title={`Creator: ${roomDetails?.creator}`} arrow style={{ backgroundColor: 'inherit' }}>
            <button className="get_button" title="Show Creator">
              <InfoOutlinedIcon className="info-button" />
            </button>
            </Tooltip>
            <p></p>
            </div>
            
          </div>
          <div className="chat__messages">
          {roomMessages
    .filter(({ message }) => {
      
      const lowerCaseMessage = message.toLowerCase();
      const lowerCaseSearch = search.toLowerCase();
      
      return lowerCaseMessage.startsWith(lowerCaseSearch);
    })
    .map(({ message, timestamp, user, userImage }) => (
      <Message
        key={timestamp} 
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