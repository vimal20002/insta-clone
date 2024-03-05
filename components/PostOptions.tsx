'use client'
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import {  useEffect, useState } from "react";
import { disLikePost, likePost } from "@app/api/api";
import Link from "next/link";
type props={
  pid:String| String[],
  cnt:number,
  incLike:(cnt:number)=>void,
  liked:Boolean,
  setLiked:(liked:Boolean)=>void,
  me:String,
  setShareBox:(flag:Boolean)=>void,

}
const PostOptions = ({pid, cnt, incLike, liked, setLiked,me, setShareBox}:props) => {
  const handleLikeClick= async()=>{
    if(!liked){
      console.log("likinggg")
      await likePost({pid, username:me})
      incLike(cnt+1);
    }
    else{
      incLike(cnt - 1)
      await disLikePost({pid, username:me})
    }
    setLiked(!liked)
  }
  return (
    <div className="postoptions">
      <div onClick={handleLikeClick}>
      {
      liked?
      <Image alt="like" src='/like.png' width={25} height={25} className="pinkheart"/>:
      <FaRegHeart className = "posticon"/>
    }
    </div>
      <Link href={`/p/${pid}`}>
      <FaRegComment className = "posticoncmnt"/>
      </Link>
      <IoPaperPlaneOutline className = "posticon" onClick={()=>{
        setShareBox(true)
      }}/>
      <FaRegBookmark className = "bookmark posticon" />


    </div>
  )
}

export default PostOptions
