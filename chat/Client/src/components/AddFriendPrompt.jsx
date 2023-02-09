import { React, useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import axios from 'axios'

const AddFriendPrompt = ({ handleFriendPrompt, loggedUser }) => {
  const [ friendEntry, setFriendEntry ] = useState('')
  const [ noUsers, setNoUsers ] = useState(false)
  const [ allUsers, setAllUsers ] = useState([])
  const [ searchRes, setSearchRes ] = useState([]);

  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      handleFriendPrompt()
    }
  }

  useEffect(() => {
    const filteredRes = []
    if (noUsers === false) {
      allUsers.forEach((user) => {
          if (friendEntry === user.username.substr(0, friendEntry.length) && friendEntry !== '') {
              filteredRes.push(user)
          }
      })
    }

    setSearchRes(filteredRes)
  }, [friendEntry, allUsers])

  const addFriend = async (friend) => {
    handleFriendPrompt()

    if (friend) {
      const result = await axios.post('http://localhost:8000/api/add-friend', {
        friend,
        loggedUser
      })

      
      if (result.data.status === false) {
        console.log(result.data.status);
      }
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await axios.get('http://localhost:8000/api/all-users')
      const users = allUsers.data.users.filter(user => user._id !== loggedUser._id)
      if (users.length < 1)
      {
        return setNoUsers(true)
      }
      setNoUsers(false)
      setAllUsers(users)
    }
    getUsers()

  }, [])


  return (
    <div onClick={handleCloseClick} className='z-10 w-screen h-screen absolute flex left-0 top-0 bg-black/50'>
        <div className='bg-white rounded-2xl w-60 m-auto'>
          <div className=''>
            <div className='flex items-center'>
              <h2 className='font-bold my-2 -mr-8 ml-auto'>Add a Friend</h2>
              <MdClose onClick={handleCloseClick} className='w-5 h-5 bg-neutral-200 mr-3 ml-auto hover:cursor-pointer' />
            </div>
            <input value={friendEntry} onChange={e => setFriendEntry(e.target.value)} className='outline-none border-2 flex m-auto w-[95%] h-7 px-2 text-sm rounded-2xl' placeholder='Search' />
          </div>
          <div className='mb-3.5 mt-3 h-[28rem] overflow-y-auto'>
            {
              friendEntry.length > 0
              ?
                searchRes.map((user, index) => {
                  return (
                    <div key={index} className='border-b border-zinc-400 last:border-none'>
                      <div onClick={() => addFriend(user)} className='flex justify-start items-center h-12 pl-2 select-none bg-zinc-100 hover:pl-2 hover:border-l-[6px] border-indigo-400 hover:cursor-pointer'>
                        <img src={`http://localhost:8000/profile-images/${user.avatar_img}`} className='w-9 h-9 object-cover rounded-full mr-2' />
                        <p>{user.username}</p>
                      </div>
                    </div>
                  )
                })
              :
                allUsers.map((user, index) => {
                  return (
                    <div key={index} className='smooth border-b border-zinc-400 last:border-none'>
                      <div onClick={() => addFriend(user)} className='smooth flex justify-start items-center h-12 pl-2 select-none bg-zinc-100 hover:pl-2 hover:border-l-[6px] border-indigo-400 hover:cursor-pointer'>
                        <img src={`http://localhost:8000/profile-images/${user.avatar_img}`} className='w-9 h-9 object-cover rounded-full mr-2' />
                        <p>{user.username}</p>
                      </div>
                    </div>
                  )
                })
            }
            {
              allUsers.length < 1 && noUsers === false
              ?
                <div className='h-full flex items-center'>
                  <svg aria-hidden="true" className="w-7 h-7 mr-auto ml-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
              :
                ''
            }
            {
              (friendEntry.length > 0 && searchRes.length < 1) || noUsers === true
              ?
                <p className='flex justify-center mt-2 text-sm text-zinc-600'>No Users Found</p>
              :
                ''
            }
          </div>
        </div>
    </div>
  )
}

export default AddFriendPrompt