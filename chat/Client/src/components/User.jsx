import React from 'react'

const User = ({ user, selectedUser, onClick }) => {
  return (
    <div onClick={onClick} className={`${selectedUser ? 'shadow-md' : ''} select-none flex border-b-2 last:border-b-0 py-2 px-1 hover:shadow-md`}>
        <img className='w-[26px] h-[26px]' src={user.avatar_img} />
        <div className='flex pl-1.5'>
            <p className='usr flex text-xs items-center select-none'>{user.username}</p>
        </div>
    </div>
    )
}

export default User