import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/authSlice'
import { SERVER_URL } from '../varHelper';

const UserProfile = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.auth.user)


  const uploadImage = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])

    const uploadImg = await axios.post(`${SERVER_URL}/api/upload-img`, data)
  
    const fileName = uploadImg.data.filename
    
    await axios.post(`${SERVER_URL}/api/update-img`, {
      loggedUser: loggedUser,
      fileName: fileName
    })

    const allUsers = await axios.get(`${SERVER_URL}/api/all-users`)
    const newUsr = allUsers.data.users.filter(user => user._id === loggedUser._id)
   
    if (newUsr[0]) {
      dispatch(updateUser(newUsr[0]))
    }    
  }

  return (
    <div className=''>
        <h2 className='flex justify-center font-bold text-xl uppercase mb-[0.4rem]'>Profile</h2>
        <div className='flex shadow-md p-3 bg-white rounded-2xl'>
          <div className='flex flex-col items-center'>
            <img src={`${SERVER_URL}/profile-images/${loggedUser.avatar_img}`} className='w-32 h-32 object-cover select-none rounded-full' alt="logged user" />
            <label htmlFor="file-upload" className='bg-indigo-500 text-white select-none rounded-lg text-xs mt-2 py-1 px-2 hover:cursor-pointer hover:shadow-md'>Choose image</label>
            <input type="file" id="file-upload" hidden onChange={uploadImage}></input>
          </div>
          <p className='pl-2 pb-7 font-bold my-auto text-base'>{loggedUser.username}</p>
        </div>
    </div>
  )
}

export default UserProfile