"use client"
import { useContext, useEffect, useState } from "react"
import LikeCounts from "./LikeCounts"
import MainimagePost from "./MainimagePost"
import PostCaption from "./PostCaption"
import PostCommentCount from "./PostCommentCount"
import PostOptions from "./PostOptions"
import UserdetailPost from "./UserdetailPost"
import { AppContext } from "@app/context/MainContext"
import ShareUser from "./ShareUser"
import { AppContextType, initProps } from "@Interfaces"
type props = {
  username:string,
  imageUri:string,
  likeCount:number,
  comment:Object[],
  caption:string,
  id:string,
  likedBy:[String],

}
const PostCard = ({username, imageUri, likeCount, comment, caption,id, likedBy}:props):JSX.Element => {  
  const [cnt, setCnt] = useState<number>(likeCount)
  const [liked, setLiked] = useState<Boolean>(false)
  const {state}:AppContextType = useContext(AppContext)
  const[shareBox, setShareBox] = useState<Boolean>(false)
  const {user}:initProps = state;

  useEffect(()=>{
    // console.log(likedBy?.includes(user?.username), caption)
    setLiked(likedBy?.includes(user?.username))
  },[user])


  return (
    <div className="postcard">
      {   shareBox && <ShareUser email={user?.email} id={id} setFlag={setShareBox}   friends={user?.friends}/>
}
      <UserdetailPost name={username} time="4h"/>
      <MainimagePost uri={imageUri}/>
      <PostOptions setShareBox={setShareBox} pid={id} cnt={cnt} incLike={setCnt} setLiked = {setLiked} liked={liked} me = {state?.user?.username}/>
      <LikeCounts count={cnt}/>
      <PostCaption name={username} caption={caption}/>
      <PostCommentCount count={comment?.length}/>
      <hr />
    </div>
  )
}

export default PostCard
