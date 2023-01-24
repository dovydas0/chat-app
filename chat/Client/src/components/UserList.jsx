import { React, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import User from './User'
import AddFriendPrompt from './AddFriendPrompt'
import axios from 'axios'

const UserList = ({ handleSelect, selected, contacts, loggedUser }) => {
    const [ friendAddition, setFriendAddition ] = useState(false)
    const userHtmlEl = useRef()
    const userSectionHtmlEl = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (userHtmlEl.current && !userHtmlEl.current.contains(e.target) && userSectionHtmlEl.current.contains(e.target)) {
                handleSelect('')
            }
        }
        
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

    const handleFriendPropmt = async () => {
        setFriendAddition(prev => !prev)
    }

    return (
        <div className='grid-users flex-initial overflow-hidden w-64 bg-white pt-3 px-3'>
            <div className='flex w-full place-content-between items-center my-3'>
                <h2 className='font-bold'>Messages</h2>
                <FontAwesomeIcon size='2xs' icon={faPen} />
            </div>
            <div className='my-2'>
                <input className="bg-gray-50 rounded-3xl border-2 w-full text-xs pl-3 pb-1.5 pt-1.5 outline-none" type="text" placeholder='Search' />
            </div>
            <div ref={userSectionHtmlEl} className='-mx-3'>
                <div ref={userHtmlEl} className='flex flex-col m-3'>
                {
                    contacts.map((user, index) => {
                        return (
                            <User
                                key={index}
                                user={user}
                                selectedUser={user === selected}
                                onClick={() => handleSelect(user)}
                            />
                        )
                    })
                }
                </div>
            </div>
            <button onClick={handleFriendPropmt} className='border px-2 py-1 text-sm w-28 rounded-3xl bg-orange-300 m-auto'>Add friends</button>
            {
                friendAddition ? <AddFriendPrompt handleFriendPropmt={handleFriendPropmt} loggedUser={loggedUser} /> : ''
            }
        </div>
    )
}

export default UserList