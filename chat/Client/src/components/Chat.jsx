import {React, useState, useEffect, useRef } from 'react'
import { saveAs } from 'file-saver';
import MenuBar from './MenuBar'
import UserList from './UserList'
import Content from './Content'
import axios from 'axios'
import io from 'socket.io-client'

const Chat = ({ loggedUser }) => {
    const [ files, setFiles ] = useState([])
    const [ selected, setSelected ] = useState('')
    const [ contacts, setContacts ] = useState([])
    const [ friendAddition, setFriendAddition ] = useState(false)
    const [ profileOpened, setProfileOpened ] = useState(false)
    let socket = useRef()
    
    useEffect(() => {
        socket.current = io('http://localhost:8000')
        socket.current.emit('add-user', loggedUser._id)
    }, [loggedUser])

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/all-images', { responseType: 'arraybuffer' })
    //     .then(res => {
    //         const buffer = res.data
    //         const bufferArray = Array.from(new Uint8Array(buffer))
    //         const fileBlobs = []
    //         bufferArray.forEach(buffer => {
    //             const blob = new Blob([buffer], { type: 'application/octet-stream' })
    //             fileBlobs.push(blob)
    //         })
    //         setFiles(fileBlobs)
    //     })
    // }, [])

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
            <UserList friendAddition={friendAddition} setFriendAddition={setFriendAddition} handleSelect={handleSelect} selected={selected} contacts={contacts} loggedUser={loggedUser} />
            <Content selected={selected} profileOpened={profileOpened} loggedUser={loggedUser} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;