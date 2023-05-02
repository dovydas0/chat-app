import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deselectUser, selectUser } from '../store/selectedUserSlice'
import axios from 'axios'
import io from 'socket.io-client'
import MenuBar from './MenuBar'
import UserList from './UserList'
import Content from './Content'
import { SERVER_URL } from '../varHelper';


const socket = io(`${SERVER_URL}`)
const Chat = () => {
    const [ fetchedContacts, setFetchedContacts ] = useState([])
    const [ activeContacts, setActiveContacts ] = useState([])
    const [ contacts, setContacts ] = useState([])
    const [ friendAddition, setFriendAddition ] = useState(false)
    const [ profileOpened, setProfileOpened ] = useState(false)
    const loggedUser = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    
    // Adding a user to the socket users array
    useEffect(() => {
        socket.emit('add-user', loggedUser._id)
    }, [loggedUser])

    // Fetching friends from the database
    useEffect(() => {
        axios.post(`${SERVER_URL}/api/all-friends`, {
            loggedUser
        })
        .then(res => {
            if (res.data.status) {
                setFetchedContacts(res.data.friends[0].friends)  
            }
        })
        .catch(err => console.log(err))
    }, [loggedUser, friendAddition])

    // Storing active socket users
    useEffect(() => {
        socket.on('active-users', (activeUsers) => {
            setActiveContacts(activeUsers)
        })
        socket.on('add-friend-response', () => {
            setFriendAddition(prev => !prev)
        })

        return () => {
            socket.off('active-users')
            socket.off('add-friend-response')
        }
    }, [socket, contacts])

    // Indicating active socket users on contacts
    useEffect(() => {
        const activeFriends = []
        fetchedContacts.forEach(contact => {
            const activeContact = activeContacts.find(activeUser => activeUser.userID === contact._id)
            
            if (activeContact) {
                activeFriends.push({...contact, active: true})
            } else {
                activeFriends.push({...contact, active: false})
            }
        })
        setContacts(activeFriends)

    }, [activeContacts, fetchedContacts])

    const handleProfileOpening = () => {
        setProfileOpened(true)
        dispatch(deselectUser())
    }
    
    const handleSelect = (user) => {
        setProfileOpened(false)
        dispatch(selectUser(user))
    }

    return(
        <div className="flex m-auto w-3/4 max-w-screen-md h-3/4 bg-gray-100 rounded-2xl">
            <div>
                {
                    activeContacts.map((user, index) => {
                        return (
                            <div key={index}>
                                <p>{user.username}</p>
                                <p>{user.active}</p>
                            </div>
                        )
                    })
                }
            </div>
            <MenuBar />
            <UserList setFriendAddition={setFriendAddition} contacts={contacts} setContacts={setContacts} handleSelect={handleSelect} socket={socket} />
            <Content profileOpened={profileOpened} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;