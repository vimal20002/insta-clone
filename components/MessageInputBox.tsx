import React from 'react'
type props = {
    message:string,
    setMessage:(val:string)=>void
}
const MessageInputBox = ({message,setMessage}:props) => {
  return (
    <input type="text" name="message" placeholder="Message..." className="message" value={message} onChange={(e:any)=>{setMessage(e?.target?.value)}}/>
  )
}

export default MessageInputBox
