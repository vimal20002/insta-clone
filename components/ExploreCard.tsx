"use client"
import { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
type Props={
    imageUrl:string,
    likes:string,
    comments:string
}
const ExploreCard = ({imageUrl,likes,comments}:Props) => {
  return (
    <div className='explore-card-main'>
    
     <div className="exploreimgdiv" >
    <img  className='exploreCardimg'  src={imageUrl} alt="" />
     </div>
     <div className="exploreCardopt">
     {likes} <FaRegComment  className='explore-icons'/> 
   {comments} <IoIosHeartEmpty className='explore-icons' />
     </div>
      
      
    </div>
  )
}

export default ExploreCard
