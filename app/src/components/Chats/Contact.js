import React from 'react'

const Contact = ({text, name, photoUrl}) => {
  return (
    <div>
        <div>{name}</div>
        <div>{text}</div>
    </div>
  )
}

export default Contact;