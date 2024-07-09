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
import { AppContextType, Comment, initProps, LargePost} from "@Interfaces"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"



const PostCardLarge = ({pid, setFlag, comments, imageUri, likeCount, username, likedBy}:LargePost):JSX.Element => {
    const router:AppRouterInstance = useRouter();
    const [val, setVal] = useState<string>("");
    const [comArr, setComArr] = useState<[Comment]>(comments)
    const [cnt, setCnt] = useState<number>(0)
    const [liked, setLiked] = useState<Boolean>(false)
    const {state}:AppContextType = useContext(AppContext)
    const {user}:initProps = state;
    useEffect(()=>{
        setCnt(likeCount)
        setComArr(comments)
    },[likeCount, comments])
    useEffect(()=>{
      // console.log(likedBy?.includes(user?.username), caption)
      setLiked(likedBy?.includes(user?.username))
    },[user])
    
    const handleRandClick=()=>{
       setFlag(false)
       router.push('/')
      }
      const handleComment = async()=>{
        const username:string = user?.username;
        const obj:Comment = {comment:val, username}
        comArr.push(obj)
        setComArr(comArr)
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
        <PostOptions setShareBox={()=>{}} pid={pid} cnt={cnt} incLike={setCnt} setLiked = {setLiked} liked={liked} me = {state?.user?.username}/>
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
