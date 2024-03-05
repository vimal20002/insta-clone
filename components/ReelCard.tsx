import { AppContext } from "@app/context/MainContext";
import { useContext, useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";

const ReelCard = () => {
  const {state, dispatch} = useContext(AppContext)
  useEffect(()=>{
    dispatch({type:'setLogin'})
  },[])
    const [likeCount,setLikeCount]=useState(230);
    const [commentCount,setCommentCount]=useState(160);
    const [followed,setFollowed]=useState(false);

   
    
    const likeReel = ()=>{
      setLikeCount(likeCount+1)    }
    const comment = ()=>{
      // setCommentCount(commentCount+1)
    }
    const handleFollow=()=>{
      setFollowed(!followed);
     }
    const handlePP=()=>{
      const video:any = document.getElementById("vdo")
      if (video?.paused) {
        video?.play();
      } else {
        video?.pause();
      }
    }
  return (
    <div className="reels">
    <video className="reels-main"  id="vdo" onClick={handlePP}
   
    >
     <source src="/nvideo1.mp4" type="video/mp4"/>
     browser doesnt support
    </video>
   
    <div className="reel-opt">
      <div className="reel-like">
    <GoHeart  className = "reel-icon" onClick ={likeReel} />
    <p>{likeCount}</p>
    </div>
    <div className="reel-comment" onClick ={comment}>
    <FaRegComment className = "reel-icon" />
    <p>{commentCount}</p>
    </div>
    <TbSend className = "reel-icon" />
    <FaRegBookmark className = "reel-icon" />
    </div>
    <div className="post-info">
      <div className="user-det">
        <img className="reel-user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4y7zVmHqMDDZPFYCAtIvlWWGYofVYEwNg4AyzbXsRg&s" alt="rtyutru" />
      <p>Raghav</p>
      <div className="fl" onClick={handleFollow}>{followed ? "Following" : "Follow"}</div>
      </div>
      <div className="detail">Gali ma AAJ eko maal aayil ba!!Bhojpuri song new</div>
    </div>
    </div>
  )
}

export default ReelCard
