import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SidebarOption from './SidebarOption';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import { getUserChannels } from './user_channels';
import JoinChannel from './JoinChannelOption';


function Sidebar() {
  const [show,setShowLess] = useState(true);
  const [channelNames, setChannelNames] = useState([]);
  const [{ user }] = useStateValue();
  
   useEffect(() => {

  const fetchUserChannelsAndNames = async () => {
    try {
      const userId = user?.uid;

      if (userId) {
        const userChannels = await getUserChannels(userId);
        setChannelNames([]);

        if (userChannels.length > 0) {
          const names = [];

          for (const channelId of userChannels) {
            const snapshot = await db.collection('rooms').doc(channelId.toString()).get();
            const channelName = snapshot.data()?.name;

            if (channelName) {
              names.push({ id: channelId, name: channelName });
            }
          }
            setChannelNames(names);
          
        }
      }
    } catch (error) {
      console.error('Error fetching user channels and names: ', error);
    }
  };

  fetchUserChannelsAndNames();
}, [user]);
  
    return (
        <div className='sidebar'>
          <div className='sidebar_header'>
            <div className='sidebar_info'>
                <h2>User_Name</h2>
                <h3>
                   <FiberManualRecordIcon/>
                    {user?.displayName}
                </h3>
            </div>
            <CreateIcon/>
            </div>
            {show && <div>
              <SidebarOption Icon={InsertCommentIcon} title='Threads'/>
              <SidebarOption Icon = {InboxIcon} title='Mentions & Reactions'/>
              <SidebarOption Icon={DraftsIcon} title='Saved Items'/>
              <SidebarOption Icon={BookmarkBorderIcon} title='Channel Browser'/>
              <SidebarOption Icon={PeopleAltIcon} title='People and User Groups'/>
              <SidebarOption Icon={AppsIcon} title='Apps'/>
              <SidebarOption Icon={FileCopyIcon} title='File Browser'/>
            </div>}
            <button className='showless-button' onClick={() => setShowLess(!show)}>{show ? <SidebarOption Icon={ExpandLessIcon} title='Show Less'/>: <SidebarOption Icon={ExpandMoreIcon} title='Show More'/>}</button>
            <div className='Channels-box'>
            <SidebarOption Icon={ExpandMoreIcon} title='Channels'/>
            <SidebarOption Icon={AddIcon} addChannelOption title='Add Channels'/>
            <JoinChannel Icon={AddIcon} joinChannelOption title='Join Channel'/> 
            <div className="channels">
              {channelNames.map((channel) =>(
              <SidebarOption title ={channel.name} id = {channel.id}/>
              ))}
            </div>
            </div>
          </div>
          
     
      )
    }
    
    export default Sidebar
