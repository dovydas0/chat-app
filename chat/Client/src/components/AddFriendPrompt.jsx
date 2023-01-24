import { React, useState } from 'react'

const AddFriendPrompt = ({ handleFriendPropmt }) => {
    const [ friendEntry, setFriendEntry ] = useState('')

  return (
    <div onClick={handleFriendPropmt} className='w-screen h-screen absolute flex left-0 top-0 bg-black/50'>
        <div className='bg-white rounded-2xl w-[32rem] h-1/2 m-auto'>
            <h2 className='flex justify-center font-bold my-3'>Add a Friend</h2>
            <hr className='m-auto w-[95%] border-t border-zinc-300' />
            <input value={friendEntry} onChange={e => setFriendEntry(e.target.value)} />
        </div>
    </div>
  )
}

export default AddFriendPrompt