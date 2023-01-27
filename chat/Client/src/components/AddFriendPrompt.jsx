import { React, useState, useEffect } from 'react'
import axios from 'axios'

const AddFriendPrompt = ({ handleFriendPrompt, loggedUser }) => {
  const [ friendEntry, setFriendEntry ] = useState('')
  const [ allUsers, setAllUsers ] = useState([])

  const handleBgClick = (e) => {
    if (e.target === e.currentTarget) {
      handleFriendPrompt()
    }
  }

  const addFriend = async (friend) => {
    if (friend) {
      await axios.post('http://localhost:8000/api/add-friend', {
        friend,
        loggedUser
      })
      .then(res => {
        if (res.data.status) {
          handleFriendPrompt()          
        } else {
          console.log(res.data.status);
          handleFriendPrompt()
        }
      })
      .catch(err => {console.log(err)})
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/all-users')
    .then(res => {
      const users = res.data.users.filter(user => user._id !== loggedUser._id)
      setAllUsers(users)
    })
    .catch(err => {console.log(err)})
  }, [])

  return (
    <div onClick={handleBgClick} className='z-10 w-screen h-screen absolute flex left-0 top-0 bg-black/50'>
        <div className='bg-white rounded-2xl w-60 h-4/5 m-auto'>
          <h2 className='flex justify-center font-bold my-2'>Add a Friend</h2>
          <input value={friendEntry} onChange={e => setFriendEntry(e.target.value)} className='outline-none border-2 flex m-auto w-[95%] h-7 px-2 text-sm rounded-2xl' placeholder='Search' />
          <div className='mb-2 mt-3'>
            {
              allUsers.length > 0
              ?
                allUsers.map((user, index) => {
                  return (
                    <div key={index} className='border-b border-zinc-400 last:border-none'>
                      <div onClick={() => addFriend(user)} className='flex justify-start items-center h-12 pl-2 select-none bg-zinc-100 hover:pl-2 hover:border-l-[6px] border-indigo-400'>
                        <img src={user.avatar_img} className='w-9 h-9 mr-2' />
                        <p>{user.username}</p>
                      </div>
                    </div>
                  )
                })
              :
                <p className='flex justify-center mt-2 text-sm text-zinc-600'>No Users Found</p>
            }
          </div>
        </div>
    </div>
  )
}

export default AddFriendPrompt