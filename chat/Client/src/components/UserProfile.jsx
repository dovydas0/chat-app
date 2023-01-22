import React from 'react'

const UserProfile = ({ loggedUser }) => {
  return (
    <div className=''>
        <h2 className='flex justify-center font-bold text-xl uppercase mb-[0.4rem]'>Profile</h2>
        <div className='flex shadow-md p-3 bg-white rounded-2xl'>
            <img src={loggedUser.avatar_img} className='w-24 mr-2 select-none' />
            <div className='opacity-0 hover:opacity-100 absolute flex items-center justify-center bg-neutral-300 w-24 h-24 rounded-full'>
                <p className=' text-xs select-none mt-8 z-20 absolute font-semibold'>Choose image</p>
            </div>
            <p className='pr-2 font-bold uppercase my-auto text-sm'>{loggedUser.username}</p>
        </div>
    </div>
  )
}

export default UserProfile