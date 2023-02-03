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
        axios.get('http://localhost:8000/api/all-users')
        .then(res => {
          const newUsr = res.data.users.filter(user => user._id === loggedUser._id)
          console.log(newUsr[0])
          /*
            SET NEW LOGGED USER WITH NEW AVATAR_IMG
          */
        })
      })
    }) 
  }

  return (
    <div className=''>
        <h2 className='flex justify-center font-bold text-xl uppercase mb-[0.4rem]'>Profile</h2>
        <div className='flex shadow-md p-3 bg-white rounded-2xl'>
          <div className='flex flex-col items-center'>
            <img src={`http://localhost:8000/profile-images/${loggedUser.avatar_img}`} className='w-32 h-32 object-cover select-none rounded-full' />
            <label htmlFor="file-upload" className='bg-indigo-500 text-white select-none rounded-lg text-xs mt-2 py-1 px-2 hover:cursor-pointer hover:shadow-md'>Choose image</label>
            <input type="file" id="file-upload" hidden onChange={uploadImage}></input>
          </div>
          <p className='pl-2 pb-7 font-bold my-auto text-base'>{loggedUser.username}</p>
          {/* <div className='opacity-0 hover:opacity-100 absolute flex items-center justify-center bg-neutral-300 w-24 h-24 rounded-full'>
              <p className=' text-xs select-none mt-8 absolute font-semibold'>Choose image</p>
            </div> */}
        </div>
    </div>
  )
}

export default UserProfile