import React from 'react'
import axios from 'axios';

const UserProfile = ({ loggedUser }) => {

  const uploadImage = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])

    let fileName = ''
    
    await axios.post('http://localhost:8000/api/upload-img', data)
    .then((res) => {
      fileName = res.data.filename
      console.log(res.status)
      
      axios.post('http://localhost:8000/api/update-img', {
        loggedUser: loggedUser,
        fileName: fileName
      })
      .then((res) => {
        console.log(res.status);
      })
    }) 
  }

  return (
    <div className=''>
        <h2 className='flex justify-center font-bold text-xl uppercase mb-[0.4rem]'>Profile</h2>
        <div className='flex shadow-md p-3 bg-white rounded-2xl'>
          <input type="file" name="file" onChange={uploadImage}></input>
          <img src={`http://localhost:8000/profile-images/${loggedUser.avatar_img}`} className='w-32 h-32 mr-2 select-none rounded-full' />
          <div className='opacity-0 hover:opacity-100 absolute flex items-center justify-center bg-neutral-300 w-24 h-24 rounded-full'>
              <p className=' text-xs select-none mt-8 absolute font-semibold'>Choose image</p>
          </div>
          <p className='pr-2 font-bold uppercase my-auto text-sm'>{loggedUser.username}</p>
        </div>
    </div>
  )
}

export default UserProfile