import { AppContext } from "@app/context/MainContext"
import { useContext } from "react"

type CardProps={
    imgUri:string,
    lastMessage:string,
    name:string,
    setTargetmail:(val:string)=>void,
    setName:(val:string)=>void,
    sid:string
}
const ChatCard = ({imgUri, lastMessage, name, setTargetmail, sid, setName}:CardProps) => {
     const {dispatch}=useContext(AppContext)
    const handleClick=()=>{
     dispatch({
        type:'showMessageBox'
     })
     setTargetmail(sid)
     setName(name)
    }
  return (
    <div className="ChatCard-main" onClick={handleClick}>
      <img className="chatImg" src="https://www.hindi.awazthevoice.in/blog/wp-content/uploads/2022/08/1760548ccd1e71a6ca0639903c5cd1be.jpg" alt="img" />
      <div className="cardText">
            <h5 className="cardName">{name}</h5>
            <p className="chat-p">{lastMessage}</p>
      </div>
    </div>
  )
}

export default ChatCard
