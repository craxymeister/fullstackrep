import React from "react"
import './../App.css'

const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  } else if (message.isError === true) {
    return (
      <div className='error'>
        {message.text}
      </div>
    )
  }

  return (
    <div className='success'>
      {message.text}
    </div>
  )
}

export default Notification