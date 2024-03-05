"use client"
import UserDisplay from "./UserDisplay"
import { FiPhone } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ButtonPrimary from "./ButtonPrimary";
import ReelCard from "./ReelCard";
import { useEffect, useState } from "react";
import MessageInputBox from "./MessageInputBox";
interface IncomingMessage {
    senderId: string;
    message: string;
}
type props = {
    name:string|null|undefined,
    email:string |null|undefined,
    handleSend:(val:string)=>void,
    messages:IncomingMessage[],
}
const MessageBox = ({handleSend, messages, name, email}:props) => {
   const [message, setMessage] = useState<string>("")

    return (
         <div className="main-messageUI">
        <div className="message-recepient">
            <UserDisplay name={name} />
            <div className="messageBox-icons">
                <FiPhone className="phone-icon" />
                <BsCameraVideo className="video-icon" />
                <IoIosInformationCircleOutline className="info-icon" />
            </div>
        </div>
         <div className="mess">
            {
              messages?.map((e)=>{
                console.log(e, email)
                if(e.senderId !== email)
                {
                    return <div className="friendMessage" >{e.message}</div>
                }
                else
                {
                    return <div className="myMessage" >{e.message}</div>;
                }
              })
            }
           
         </div>
         {/* <div className="sent-messages">
            <ReelCard/>
         </div> */}


        <div className="messageInput-section">
            <MessageInputBox message={message} setMessage={setMessage}/>
        <button className="normalButton" onClick={()=>{
            handleSend(message)
            setMessage("")
            }}>Send</button>
        </div>
      </div>

  )
}

export default MessageBox
