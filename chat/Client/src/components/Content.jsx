import { React, useState } from 'react'
import UserProfile from './UserProfile'
import ChatContent from './ChatContent'

const Content = ({ selectedRef, selected, profileOpened, loggedUser, handleProfileOpening, socket }) => {
    
    return(
        <div className='flex-initial basis-3/4 w-56 px-6 mt-5 pb-16 overflow-hidden'>
            {
                profileOpened
                ?
                    <UserProfile loggedUser={loggedUser} />
                :
                    <ChatContent selectedRef={selectedRef} selected={selected} loggedUser={loggedUser} handleProfileOpening={handleProfileOpening} socket={socket} />
            }
        </div>
            
    );
}

export default Content