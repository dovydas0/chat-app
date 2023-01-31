import { React } from 'react'

const SearchUsers = ({ searchRes, setSearchText, handleSelect }) => {

    const handleSelectUser = (contact) => {
        handleSelect(contact)
        setSearchText('')
    }

  return (
    <div className='relative bg-white shadow-lg border-b border-r border-l'>
        {
            searchRes.map((contact, index) => {
                return (
                    <div key={index} className='border-b last:border-none'>
                        <div className='flex items-center pl-2 p-1 hover:cursor-pointer hover:pl-2 hover:border-l-[6px] border-indigo-400' onClick={() => handleSelectUser(contact)} >
                            <img src={contact.avatar_img} className='w-6 h-6 mr-2' />
                            <p className='text-sm select-none'>{contact.username}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default SearchUsers