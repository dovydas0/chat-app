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
    const [ activeContacts, setActiveContacts ] = useState([])
    const [ friendAddition, setFriendAddition ] = useState(false)
    const [ profileOpened, setProfileOpened ] = useState(false)
    const loggedUser = useSelector(state => state.auth.user)
    let socket = useRef()
    const dispatch = useDispatch()
    
    useEffect(() => {
        socket.current = io('http://localhost:8000')
        socket.current.emit('add-user', loggedUser._id)
    }, [loggedUser])
    // console.log(activeContacts);

    useEffect(() => {
        if (socket.current) {
            socket.current.on('active-users', (active) => {
                // console.log(active);
                // setActiveContacts(active)

                
                const activeFriends = []

                active.forEach(activeUsers => {
                    
                    const activeFrnd = contacts.filter(activeFr => {
                        return activeFr._id === activeUsers.userID
                    })
                    if (activeFrnd.length > 0) {
                        activeFrnd[0].active = true
                        activeFriends.push(activeFrnd[0])
                    }
                })

                console.log(activeFriends);
                console.log('running')
                setActiveContacts(activeFriends)
                // console.log(activeFriends)
                // console.log(activeContacts);
                // console.log('active friends: ', activeFriends);
                // setContacts(activeFriends)
            })

            return () => {
                socket.current.off('active-users')
            }
        }
    }, [socket, contacts])

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

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.emit('active-users', {
    //             loggedUser: loggedUser,
    //             friends: contacts
    //         })
    //     }
    // }, [socket])

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on('active-friends', (active) => {
    //             console.log('running');
    //             const activeFriends = []
    //             contacts.forEach(friend => {
    //                 const activeFrnd = active.filter(activeFr => {
    //                     return activeFr._id === friend._id
    //                 })
    //                 // console.log(activeFrnd);
    //                 if (activeFrnd.length > 0) {
    //                     activeFriends.push(activeFrnd[0])
    //                     console.log('active');
    //                 }
    //                 else {
    //                     activeFriends.push(friend);
    //                 }
    //             })
    //             console.log('active friends: ', activeFriends);
    //             setContacts(activeFriends)
    //         })

    //         // return () => {
    //         //     socket.current.off('active-friends')
    //         // }
    //     }
    // }, [socket])

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on('active-users', (active) => {
    //             console.log(active);
    //             const activeFriends = []
    //             contacts.forEach(friend => {
    //                 const activeFrnd = active.filter(activeFr => {
    //                     return activeFr._id === friend._id
    //                 })
    //                 // console.log(activeFrnd);
    //                 if (activeFrnd.length > 0) {
    //                     activeFriends.push(activeFrnd[0])
    //                     console.log('active');
    //                 }
    //                 else {
    //                     activeFriends.push(friend);
    //                 }
    //             })
    //             console.log('active friends: ', activeFriends);
    //             setContacts(activeFriends)
    //         })

    //         return () => {
    //             socket.current.off('active-users')
    //         }
    //     }
    // }, [socket])

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
            <div>
                {
                    activeContacts.map((user, index) => {
                        return (
                            <div key={index}>
                                {/* <p>{user.username}</p> */}
                                <b>index</b>
                            </div>
                        )
                    })
                }
            </div>
            <MenuBar />
            <UserList friendAddition={friendAddition} setFriendAddition={setFriendAddition} contacts={contacts} handleSelect={handleSelect} />
            <Content profileOpened={profileOpened} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;