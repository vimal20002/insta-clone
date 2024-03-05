"use client"
import { useState } from "react"
import ButtonPrimary from "./ButtonPrimary"
import InputBox from "./InputBox"
import UserDisplay from "./UserDisplay"
import UserShareDis from "./UserShareDis"
import { sendMess } from "@app/api/api"

type props = {
    friends:any[],
    setFlag:(flag:Boolean)=>void,
    id:String,
    email:String
}
const ShareUser = ({friends, setFlag, id, email}:props) => {

    const [friend, setFriend] = useState<string>('')
    const [targetmail, setTargetMail] = useState<string>('')

    const [list, setList] = useState<any[]>(friends)

    const handleRandClick = ()=>{
        setFlag(false)
    }
    const handleSearch = (val:any)=>{
        setFriend(val)
        setList(friends.filter((e)=>{
            return e?.fUsername?.includes(val)
        }))
    }
    const handleSend=async()=>{
        const uri = `http://localhost:3000/p/${id}`
        const formData = {
            message:uri,
            targetmail,
            email
        }
        await sendMess(formData)
        setFlag(false)
    }
  return (
    <div>
      <div className="postBox-container"
  onClick={handleRandClick}
    ></div>
    <div className="post-flex">
    <div className="sharebox">
        <h3 style={{textAlign:"center"}}>Share</h3>
        <hr />
        <span className="to">
        <h4>To:</h4>
        <input type="text"  placeholder="Search" className="sendInp" name="friend" id="friend" value={friend} onChange={(e)=>{handleSearch(e.target.value)}}  />
        </span>
        <hr />
        <h4>Suggested</h4>
        <div className="friend-list">
            {
                list?.map((e)=>{
                    return <UserShareDis setTargetMail={setTargetMail} targetmail={e?.fEmail}  name={e?.fUsername}/>
                })
            }
        </div>
        <div style={{alignSelf:"center"}}>
        <ButtonPrimary  buttonValue="Send" onclickFun={handleSend}/>
        </div>
    </div>
    </div>
    </div>
  )
}

export default ShareUser
