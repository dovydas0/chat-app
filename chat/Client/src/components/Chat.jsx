import {React, useState, useEffect, useRef } from 'react'
import MenuBar from './MenuBar'
import UserList from './UserList'
import Content from './Content'
import axios from 'axios'
import io from 'socket.io-client'

const Chat = ({ loggedUser }) => {
    const [ selected, setSelected ] = useState('')
    const [ contacts, setContacts ] = useState([])
    const [ profileOpened, setProfileOpened ] = useState(false)
    let socket = useRef()
    
    useEffect(() => {
        socket.current = io('http://localhost:8000')
        socket.current.emit('add-user', loggedUser._id)
    }, [loggedUser])


    useEffect(() => {
        axios.post('http://localhost:8000/api/all-friends', {
            loggedUser
        })
        .then(res => {
            // const users = res.data.users.filter(user => user._id !== loggedUser._id)
            if (res.data.status) {
                setContacts(res.data.friends[0].friends)
            }
        })
        .catch(err => console.log(err))
    }, [])

    const handleSelect = (user) => {
        setSelected(user)
        setProfileOpened(false)
    }

    const handleProfileOpening = () => {
        setProfileOpened(true)
        setSelected('')
    }

    return(
        <div className="flex m-auto w-3/4 h-3/4 bg-gray-100 rounded-2xl">
            <MenuBar />
            <UserList handleSelect={handleSelect} selected={selected} contacts={contacts} loggedUser={loggedUser} />
            <Content selected={selected} profileOpened={profileOpened} loggedUser={loggedUser} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;