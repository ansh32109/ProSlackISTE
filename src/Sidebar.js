import React from 'react'
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

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <div className='sidebar_info'>
            <h2>User1</h2>
            <h3>
                <FiberManualRecordIcon/>
                Ainesh Sinha
            </h3>
        </div>
        <CreateIcon/>
       </div>
       <SidebarOption Icon={InsertCommentIcon} title='Threads'/>
       <SidebarOption Icon = {InboxIcon} title='Mentions & Reactions'/>
       <SidebarOption Icon={DraftsIcon} title='Saved Items'/>
       <SidebarOption Icon={BookmarkBorderIcon} title='Channel Browser'/>
       <SidebarOption Icon={PeopleAltIcon} title='People and User Groups'/>
       <SidebarOption Icon={AppsIcon} title='Apps'/>
       <SidebarOption Icon={FileCopyIcon} title='File Browser'/>
       <SidebarOption Icon={ExpandLessIcon} title='Show less'/>
       <hr/>
       <SidebarOption Icon={ExpandMoreIcon} title='Channels'/>
       <hr/>
       <SidebarOption Icon={AddIcon} addChannelOption title='Add Channels'/>

       {/* Connect to DB and list all the channels */}
    </div>
  )
}

export default Sidebar
