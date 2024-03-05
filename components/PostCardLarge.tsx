"use client"
import { useContext, useEffect, useState } from "react"
import ButtonPrimary from "./ButtonPrimary"
import CommentBox from "./CommentBox"
import PostOptions from "./PostOptions"
import UserDisplay from "./UserDisplay"
import { AppContext } from "@app/context/MainContext"
import { RxCross1 } from "react-icons/rx";
import { useRouter } from 'next/navigation'
import LikeCounts from "./LikeCounts"
import { addComment } from "@app/api/api"

type props = {
    pid:String| String[],
    setFlag:(flag:Boolean)=>void,
    imageUri:string,
    username:string,
    likeCount:number,
    comments:[any],
    likedBy:[String]
}
const PostCardLarge = ({pid, setFlag, comments, imageUri, likeCount, username, likedBy}:props) => {
    const router = useRouter();
    const {dispatch}=useContext(AppContext)
    const [val, setVal] = useState<string>("");
    const [comArr, setComArr] = useState<any[]>(comments)
    const [cnt, setCnt] = useState<number>(0)
    const [liked, setLiked] = useState<Boolean>(false)
    const {state} = useContext(AppContext)
    const {user} = state;
    useEffect(()=>{
        setCnt(likeCount)
        setComArr(comments)
    },[likeCount, comments])
    useEffect(()=>{
      // console.log(likedBy?.includes(user?.username), caption)
      setLiked(likedBy?.includes(user?.username))
    },[user])
    const f = ()=>{
    }
    const handleRandClick=()=>{
       setFlag(false)
       router.push('/')
      }
      const handleComment = async()=>{
        const username = user?.username;
        const obj = {val, username}
        setComArr([...comArr, obj])
        await addComment({val,pid, username})
      }
  return (<>
  
  <div className="postBox-container"
  onClick={handleRandClick}
    >
    </div>
    
    <div className="pl">
    <div className="postll">
      <img src={imageUri} alt="post" className="postl-img" />
      <div className="postl-info">
        <div className="userinfo">
        <UserDisplay name={username}/>
        
        <RxCross1 className="cross" onClick ={handleRandClick} />
        </div>
        <hr className="hr1" />
        <CommentBox arr= {comArr}/>
        <hr className="hr1" />
        <PostOptions pid={pid} cnt={cnt} incLike={setCnt} setLiked = {setLiked} liked={liked} me = {state?.user?.username}/>
        <LikeCounts count={cnt}/>
        <hr className="hr1" />
        <div className="inpl">
            <input type="text"  className="inputComment" value={val} onChange={(e)=>{setVal(e?.target?.value)}}/>
            <p className={`post ${val?.length?"act":''}`} onClick={handleComment}>Post</p>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default PostCardLarge
