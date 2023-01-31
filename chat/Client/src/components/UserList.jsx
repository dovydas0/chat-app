import { React, useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import AddFriendPrompt from './AddFriendPrompt'
import User from './User'
import SearchUsers from './SearchUsers'

const UserList = ({ friendAddition, setFriendAddition, handleSelect, selected, contacts, loggedUser }) => {
    const [ searchText, setSearchText ] = useState('');
    const [ searchRes, setSearchRes ] = useState([])

    const inputRef = useRef()
    const userHtmlEl = useRef()
    const userSectionHtmlEl = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (userHtmlEl.current && !userHtmlEl.current.contains(e.target) && userSectionHtmlEl.current.contains(e.target)) {
                handleSelect('')
                setSearchText('')
            }
        }
        
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
    
    useEffect(() => {
        const handleInputClick = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setSearchText('')
            }
        }
        
        document.addEventListener('click', handleInputClick)
        return () => {
            document.removeEventListener('click', handleInputClick)
        }
    })

    useEffect(() => {
        const filteredRes = []

        contacts.forEach((contact) => {
            if (searchText === contact.username.substr(0, searchText.length) && searchText != '') {
                filteredRes.push(contact)
            }
        })

        setSearchRes(filteredRes)
    }, [searchText])

    const handleFriendPrompt = () => {
        setFriendAddition(prev => !prev)
    }

    return (
        <div className='grid-users flex-initial overflow-hidden w-64 bg-white pt-3 px-3'>
            <div className='flex w-full place-content-between items-center my-3'>
                <h2 className='font-bold'>Messages</h2>
                <FontAwesomeIcon size='2xs' icon={faPen} />
            </div>
            <div ref={inputRef} className='my-2'>
                <input 
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)} 
                    className='bg-gray-50 rounded-3xl border w-full text-xs pl-3 pb-1.5 pt-1.5 outline-none'
                    type="text" 
                    placeholder='Search'

                />
            </div>
            <div ref={userSectionHtmlEl} className='-mx-3'>
                <div ref={userHtmlEl} className='flex flex-col m-3'>
                {
                    searchText.length > 0
                    ?
                        searchRes.map((user, index) => {
                            return (
                                <User
                                    key={index}
                                    user={user}
                                    selectedUser={user === selected}
                                    onClick={() => handleSelect(user)}
                                />
                            )
                        })
                    :
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
                {
                    searchText.length > 0 && searchRes.length < 1
                    ?
                        <p className='flex justify-center mt-2 text-sm text-zinc-600'>No Friends Found</p>
                    :
                        ''
                }
                </div>
            </div>
            <button onClick={handleFriendPrompt} className='border-2 border-indigo-400 px-2 py-1 text-sm w-28 rounded-3xl bg-indigo-50 m-auto hover:bg-indigo-300'>Add friends</button>
            {
                friendAddition ? <AddFriendPrompt handleFriendPrompt={handleFriendPrompt} loggedUser={loggedUser} /> : ''
            }
        </div>
    )
}

export default UserList