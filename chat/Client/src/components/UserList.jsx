import { React, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import User from './User'

const UserList = ({ handleSelect, selected, contacts }) => {
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

    return (
        <div className='flex-initial overflow-hidden w-64 bg-white p-3'>
            <div className='flex w-full place-content-between items-center mb-3'>
                <h2 className='font-bold'>Messages</h2>
                <FontAwesomeIcon size='2xs' icon={faPen} />
            </div>
            <div className='my-2'>
                <input className="bg-gray-50 rounded-3xl border-2 w-full text-xs pl-3 pb-1.5 pt-1.5 outline-none" type="text" placeholder='Search' />
            </div>
            <div ref={userSectionHtmlEl} className='h-full -mx-3'>
                <div ref={userHtmlEl} className='flex flex-col m-3'>
                {
                    contacts.length > 0
                    ?
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
                    :
                        <p>Add friends</p>
                }
                </div>
            </div>
        </div>
    )
}

export default UserList