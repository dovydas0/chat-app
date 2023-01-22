import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAddressBook, faGear, faComments } from '@fortawesome/free-solid-svg-icons'

const MenuBar = () => {
  return (
    <div className="flex-none basis-14 py-4 px-2 bg-indigo-500 rounded-l-2xl h-full items-center">
      <FontAwesomeIcon icon={faComments} color="rgba(0, 0, 60, 1)" size='2xl' className="mt-2 mb-4" />
      <div className='[&>*]:py-2 flex flex-col'>
        <FontAwesomeIcon icon={faHouse} color="rgba(255, 255, 255, 1)" />
        <FontAwesomeIcon icon={faAddressBook} color="rgba(255, 255, 255, 0.6)" />
        <FontAwesomeIcon icon={faGear} color="rgba(255, 255, 255, 0.6)" />
      </div>
    </div>
  )
}


export default MenuBar