
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import { addUserChannel } from './user_channels';

function JoinChannel({Icon, title, joinChannelOption}) {
  const [{ user }] = useStateValue();

  const joinChannel = async () => {
    try {
      const channelID = prompt('Enter channel ID');
        addUserChannel(user.uid,channelID);
                         
      
    } catch (error) {
      console.error('Error adding channel and updating user channels: ', error);
    }
  };

  return (
    <div className='sidebarOption' onClick={joinChannel}>

      {Icon && <Icon className='sidebarOption_icon' />}
      {Icon ? (<h3>{title}</h3>):(
      <h3 className='sidebarOption_channel'>
        <span className='sidebarOption_hash'>#</span>{title}
      </h3>)}
    </div>
  )
}

export default JoinChannel
