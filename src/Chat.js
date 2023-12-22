import React from 'react'
import "./Chat.css";
import {useParams} from "react-router-dom";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
function Chat() {
    const { roomId } = useParams();
  return (
    <div className = "chat">
        <h2> You are in the {roomId} room</h2>
        <div className='chat__header'>
          <div className='chat__headerLeft'>
            <h4 className='chat__ChannelName'>
               <strong> # general </strong>
            </h4>
          </div>
          <div className='chat__headerRight'>

          </div>
        </div>
    </div>
  );
}

export default Chat