import { React, useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import AddFriendPrompt from './AddFriendPrompt'
import User from './User'

const UserList = ({ friendAddition, setFriendAddition, contacts, handleSelect }) => {
    const [ searchText, setSearchText ] = useState('');
    const [ searchRes, setSearchRes ] = useState(['hi'])
    const selectedUser = useSelector(state => state.selected.selectedUser)
    const loggedUser = useSelector(state => state.auth.user)

    const inputRef = useRef()
    const userHtmlEl = useRef()
    const userSectionHtmlEl = useRef()
    
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
            if (searchText === contact.username.substr(0, searchText.length) && searchText !== '') {
                filteredRes.push(contact)
            }
        })

        setSearchRes(filteredRes)
    }, [searchText, contacts])

    const handleFriendPrompt = () => {
        setFriendAddition(prev => !prev)
    }

    const handleDeselect = (e) => {
        if (userHtmlEl.current && !userHtmlEl.current.contains(e.target)) {
            handleSelect('')
            setSearchText('')
        }
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
            <div ref={userSectionHtmlEl} onClick={e => handleDeselect(e)} className='-mx-3'>
                <div ref={userHtmlEl} className='flex flex-col m-3'>
                {
                    searchText.length > 0
                    ?
                        searchRes.map((user, index) => {
                            return (
                                <User
                                    key={index}
                                    user={user}
                                    selectedUser={user === selectedUser}
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
                                    active={user.active ? true : false}
                                    selectedUser={user === selectedUser}
                                    onClick={() => handleSelect(user)}
                                />
                            )
                        })
                }
                {
                    (searchText.length > 0 && searchRes.length < 1) || contacts.length < 1
                    ?
                        <p className='flex justify-center mt-2 text-sm text-zinc-600'>No Friends Found</p>
                    :
                        ''
                }
                </div>
            </div>
            <button onClick={handleFriendPrompt} className='bg-indigo-500 px-5 py-1 text-sm text-white rounded-lg m-auto hover:shadow-lg'>Add friends</button>
            {
                friendAddition ? <AddFriendPrompt handleFriendPrompt={handleFriendPrompt} loggedUser={loggedUser} /> : ''
            }
        </div>
    )
}

export default UserList