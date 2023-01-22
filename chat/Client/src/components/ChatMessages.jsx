import React from 'react'

const ChatMessages = ({ chatData, loggedUser }) => {
  
  
    return (
        <>
            {
                chatData
                ?
                    chatData.map((message, index) => {
                        return (
                            <div key={index} className={`flex ${message.senderID === loggedUser._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`w-72 max-w-[50%] pl-2 py-1 px-2 my-1 rounded-lg ${message.senderID === loggedUser._id ? 'bg-gray-200' : 'bg-indigo-200'}`}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                            )
                        })
                :
                    ''
            }
        </>
    )
}

export default ChatMessages