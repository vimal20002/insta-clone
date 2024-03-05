'use client'
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

const PostOptions = () => {
  const [liked, setLiked] = useState<Boolean>(false)
  const handleLikeClick= ()=>{
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
      
      <FaRegComment className = "posticoncmnt"/>
      <IoPaperPlaneOutline className = "posticon"/>
      <FaRegBookmark className = "bookmark posticon" />


    </div>
  )
}

export default PostOptions
