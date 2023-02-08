import { React, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deselectUser, selectUser } from '../store/selectedUserSlice'
import axios from 'axios'
import io from 'socket.io-client'
import MenuBar from './MenuBar'
import UserList from './UserList'
import Content from './Content'

const Chat = () => {
    const [ contacts, setContacts ] = useState([])
    const [ friendAddition, setFriendAddition ] = useState(false)
    const [ profileOpened, setProfileOpened ] = useState(false)
    const loggedUser = useSelector(state => state.auth.user)
    let socket = useRef()
    const dispatch = useDispatch()
    
    useEffect(() => {
        socket.current = io('http://localhost:8000')
        socket.current.emit('add-user', loggedUser._id)
    }, [loggedUser])

    useEffect(() => {
        axios.post('http://localhost:8000/api/all-friends', {
            loggedUser
        })
        .then(res => {
            if (res.data.status) {
                setContacts(res.data.friends[0].friends)
            }
        })
        .catch(err => console.log(err))
    }, [friendAddition, socket])

    const handleProfileOpening = () => {
        setProfileOpened(true)
        dispatch(deselectUser())
    }
    
    const handleSelect = (user) => {
        setProfileOpened(false)
        dispatch(selectUser(user))
    }

    return(
        <div className="flex m-auto w-3/4 h-3/4 bg-gray-100 rounded-2xl">
            <MenuBar />
            <UserList friendAddition={friendAddition} setFriendAddition={setFriendAddition} contacts={contacts} handleSelect={handleSelect} />
            <Content profileOpened={profileOpened} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;