import React from 'react'

const User = ({ user, selectedUser, onClick }) => {

    console.log(user);

  return (
    <div onClick={onClick} className={`${selectedUser ? 'shadow-md' : ''} select-none flex border-b-2 last:border-b-0 py-2 px-1 hover:shadow-md`}>
        <img className='w-7 h-7 rounded-full' src={`http://localhost:8000/profile-images/${user.avatar_img}`} alt="profile img" />
        <div className='flex pl-1.5'>
            <p className='usr flex text-xs items-center select-none'>{user.username}</p>
        </div>
    </div>
    )
}

export default User