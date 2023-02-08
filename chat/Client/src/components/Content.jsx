import { React } from 'react'
import UserProfile from './UserProfile'
import ChatContent from './ChatContent'

const Content = ({ profileOpened, handleProfileOpening, socket }) => {
    
    return(
        <div className='flex-initial basis-3/4 w-56 px-6 mt-5 pb-16 overflow-hidden'>
            {
                profileOpened
                ?
                    <UserProfile />
                :
                    <ChatContent handleProfileOpening={handleProfileOpening} socket={socket} />
            }
        </div>
            
    );
}

export default Content