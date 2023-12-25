import React from 'react'
import './Header.css'
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Header() {
  return (
    <div className='header'>
        <div className='header_left'>
            {/* Avatar for logged in user */}
            <Avatar 
            className='header_avatar'
            alt='User Avatar'
            src=''
            />
            {/* Time icon */}  
            <AccessTimeIcon />

        </div>
        <div className='header_search'>
            {/* Search icon */}
            <SearchIcon/>
            {/* Input */}
            <input placeholder='Search the app.....'/>
        </div>
        <div className='header_right'>
            {/* Help icon */}
            <HelpOutlineIcon />
        </div>
    </div>
  )
}

export default Header
