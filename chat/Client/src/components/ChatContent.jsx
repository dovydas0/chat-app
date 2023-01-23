import { React, useState, useEffect, useRef } from 'react'
import { IoMdSend } from 'react-icons/io'
import ChatMessages from './ChatMessages'
import axios from 'axios'

const ChatContent = ({ selected, loggedUser, handleProfileOpening, socket }) => {
    const [ receivedMess, setReceivedMess ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ chatData, setChatData ] = useState('')
    const chatEl = useRef()

    useEffect(() => {
        setChatData('')
        getChatData()
        .then(({ data }) => {
            if (data.status) {
                setChatData(data.data)
            }
        })

    }, [selected])

    const getChatData = async () => {
        const data = await axios.post('http://localhost:8000/api/get-chat', {
            senderID: loggedUser._id,
            receiverID: selected._id
        })

        return data
    }
    
    useEffect(() => {
        if (socket.current) {
            socket.current.on('receive-msg', message => {
                if (selected._id === message.senderID) {
                    setReceivedMess(message)
                }
            })

            return () => {
                socket.current.off('receive-msg')
            }
        }        
        // chatEl.current?.scrollIntoView({ behavior: "smooth" })
    }, [selected, socket])

    useEffect(() => {
        receivedMess && setChatData(prev => [...prev, receivedMess])
    }, [receivedMess])

    const handleSendMess = async (e) => {
        e.preventDefault()

        if (e.target[0].value == '') {
            return
        }

        setMessage('')

        await axios.post('http://localhost:8000/api/send-mess', {
            message,
            senderID: loggedUser._id,
            receiverID: selected._id
        })
        .then(res => {
            if (res.data.status) {
                socket.current.emit('send-msg', res.data.message)
            }
            const chat = [...chatData]
            chat.push(res.data.message)
            setChatData(chat)
        })
        .catch(err => {
            console.log(err);
        })
    }
 
    return (
    <>
        <div className='flex justify-end'>
            {
                selected
                ?
                    <h2 className='m-auto pl-8 font-bold uppercase text-xl'>Chat</h2>
                :
                    ''
            }
            <div className='rounded-2xl shadow-sm shadow-zinc-400 mb-2'>
                <img onClick={handleProfileOpening} className='w-[26px] cursor-pointer' src={loggedUser ? loggedUser.avatar_img : ''} />
            </div>
        </div>
        {
            selected.username
            ?
                <div className='grid-temp bg-white rounded-2xl h-full shadow-md p-4'>
                    <div className='flex pb-2 border-b border-zinc-300'>
                        <img className='w-8 h-8' src={selected.avatar_img} />
                        <div className='flex pl-1.5'>
                            <p className='flex text-sm items-center'>{selected.username}</p>
                        </div>
                    </div>
                    <div ref={chatEl} className='chtEl my-2 min-w-full overflow-y-scroll flex flex-col py-2 pr-3'>
                        <ChatMessages chatData={chatData} loggedUser={loggedUser} />
                    </div>
                    <form onSubmit={e => handleSendMess(e)} className='flex bg-gray-200 rounded-md h-7 items-center'>
                        <input type='text' value={message} onChange={e => setMessage(e.target.value)} className='w-full pl-3 h-7 bg-transparent outline-none text-xs placeholder-gray-500 placeholder' placeholder='Your message' />
                        <button type='submit' className='px-2'>
                            <IoMdSend className='w-5 h-5' />
                        </button>
                    </form>
                </div>
            :
                <div className='h-full'>
                    <hr className='m-auto w-[95%] border-t border-zinc-300' />
                    <p className='flex h-full place-content-center items-center select-none'>Please select the user to chat to</p>
                </div>
        }
    </>
    )
}

export default ChatContent