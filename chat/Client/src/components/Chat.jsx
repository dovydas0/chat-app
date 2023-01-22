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
    let selectedRef = useRef()
    
    useEffect(() => {
        socket.current = io('http://localhost:8000')
        socket.current.emit('add-user', loggedUser._id)
    }, [loggedUser])


    useEffect(() => {
        axios.get('http://localhost:8000/api/all-users')
        .then(res => {
            const users = res.data.users.filter(user => user._id != loggedUser._id)
            setContacts(users)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSelect = (user) => {
        setSelected(user)
        selectedRef.current = user
        setProfileOpened(false)
    }

    const handleProfileOpening = () => {
        setProfileOpened(true)
        setSelected('')
        selectedRef.current = ''
    }

    return(
        <div className="flex m-auto w-3/4 h-3/4 bg-gray-100 rounded-2xl">
            <MenuBar />
            <UserList handleSelect={handleSelect} selected={selected} contacts={contacts} />
            <Content selectedRef={selectedRef.current} selected={selected} profileOpened={profileOpened} loggedUser={loggedUser} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;