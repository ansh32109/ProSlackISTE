import React, { useState,useEffect } from 'react';
import './SidebarOption.css';
import { useNavigate } from 'react-router-dom';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import { addUserChannel } from './user_channels';

function SidebarOption({Icon , title, id,addChannelOption}) {
    const navigate = useNavigate();
    const [{ user }] = useStateValue();
    const selectChannel=()=>{
    if(id) {
        navigate(`/room/${id}`);

    }else if(title!= 'Show Less' && title!='Show More'){
        if(title!='Channels'){
          navigate(title);
        }
    }
   };
    const addChannel = async () => {
    try {
      const channelName = prompt('Enter channel name');
      if (channelName) {
        // Add the new channel to the rooms collection
        const newChannelRef = await db.collection('rooms').add({
          name: channelName,
          creator:user?.displayName,
        });

        const newChannelId = newChannelRef.id;
        addUserChannel(user?.uid,newChannelId);
                         
      }
    } catch (error) {
      console.error('Error adding channel and updating user channels: ', error);
    }
  };
    
    return (
    <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel }>

      {Icon && <Icon className='sidebarOption_icon' />}
      {Icon ? (<h3>{title}</h3>):(
      <h3 className='sidebarOption_channel'>
        <span className='sidebarOption_hash'>#</span>{title}
      </h3>)}
    </div>
  )
}

export default SidebarOption
       
