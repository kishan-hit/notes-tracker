import React from 'react'

const Message = (props) => {
  return (
    <div className='p-2 w-full bg-gray-700 rounded-lg'>
        {props.message}
    </div>
  )
}

export default Message