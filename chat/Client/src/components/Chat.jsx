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

    // useEffect(() => {
    //     axios.post('http://localhost:8000/api/all-friends', {
    //         loggedUser
    //     })
    //     .then(res => {
    //         if (res.data.status) {
    //             setContacts(res.data.friends[0].friends)
    //             console.log('contacts: ', contacts);
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }, [friendAddition, socket])

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
    }, [loggedUser])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('active-users', (activeUsers) => {
                // console.log(activeUsers);
                const activeFriends = []
                
                contacts.forEach(contact => {
                    const activeContact = activeUsers.find(activeUser => activeUser.userID === contact._id)
                    
                    if (activeContact) {
                        activeFriends.push({...contact, active: true})
                    } else {
                        activeFriends.push({...contact, active: false})
                    }
                })
                setActiveContacts(activeFriends)

                console.log(activeFriends);

                // console.log('running')
                // setContacts(activeFriends)
            })

            return () => {
                socket.current.off('active-users')
            }
        }
    }, [socket, contacts])


    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on('active-users', (active) => {
    //             console.log(active);
    //             // const activeFriends = []

    //             // active.forEach(activeUser => {
    //             //     const activeFrnd = contacts.find(activeFr => {
    //             //         return activeFr._id === activeUser.userID
    //             //     })

    //             //     if (activeFrnd != undefined) {
    //             //         activeFrnd.active = true
    //             //         activeFriends.push(activeFrnd)
    //             //     }
    //             // })

    //             // console.log(activeFriends);
    //             // setActiveContacts(activeFriends)

    //             // console.log('running')
    //             // setContacts(activeFriends)
    //         })

    //         return () => {
    //             socket.current.off('active-users')
    //         }
    //     }
    // }, [socket, contacts])

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
                                <p>{user.username}</p>
                                <p>{user.active}</p>
                            </div>
                        )
                    })
                }
            </div>
            <MenuBar />
            <UserList friendAddition={friendAddition} setFriendAddition={setFriendAddition} contacts={contacts} handleSelect={handleSelect} socket={socket} />
            <Content profileOpened={profileOpened} handleProfileOpening={handleProfileOpening} socket={socket} />
        </div>
    );
}

export default Chat;