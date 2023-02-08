import React from 'react'

const User = ({ user, active, selectedUser, onClick }) => {

  return (
    <div onClick={onClick} className={`${selectedUser ? 'shadow-md' : ''} select-none flex border-b-2 last:border-b-0 py-2 px-1 hover:shadow-md`}>
        <img className='w-7 h-7 object-cover rounded-full' src={`http://localhost:8000/profile-images/${user.avatar_img}`} alt="avatar" />
        <div className='flex w-full items-center justify-between pl-1.5 pr-1'>
            <p className='flex text-xs items-center select-none'>{user.username}</p>
            { active ? <img src='http://localhost:3000/active.png' className='h-1.5' /> : '' }
        </div>
    </div>
    )
}

export default User