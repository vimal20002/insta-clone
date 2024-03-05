import { AppContext } from "@app/context/MainContext";
import { useContext, useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import Image from "next/image";

type Props={
  vidLink:string,
  id:string
}
const ReelCard = ({vidLink,id}:Props) => {
  const { state, dispatch } = useContext(AppContext)
  useEffect(() => {
    dispatch({ type: 'setLogin' })
  }, [])
  const [likeCount, setLikeCount] = useState(230);
  const [commentCount, setCommentCount] = useState(160);
  const [followed, setFollowed] = useState(false);
  
  const [liked, setLiked] = useState<Boolean>(false)
  const handleLikeClick= ()=>{
    setLiked(!liked)
    console.log(liked)
    if(!liked){
      setLikeCount(likeCount + 1)
    }
    else{
      setLikeCount(likeCount-1);
    }
  }
  useEffect(()=>{

  },[id])

  
  const comment = () => {
    // setCommentCount(commentCount+1)
  }
  const handleFollow = () => {
    setFollowed(!followed);
  }
  const handlePP = () => {
    const video: any = document.getElementById(id)
    video.setAttribute('src',vidLink);
 
    console.log(vidLink);
    if (video?.paused) {
      video?.play();
    } else {
      video?.pause();
    }
  }
  return (
    <div className="reels">
      <video className="reels-main" src={vidLink} id={id} onClick={handlePP}
      >
        browser doesnt support
      </video>

      <div className="reel-opt">
        <div className="reel-like" onClick={handleLikeClick}>
        {liked?
      <Image alt="like" src='/like.png' width={25} height={25} className="pinkheart"/>:
      <FaRegHeart className = "posticon"/>
        }
          <p>{likeCount}</p>
        </div>
        <div className="reel-comment" onClick={comment}>
          <FaRegComment className="reel-icon" />
          <p>{commentCount}</p>
        </div>
        <TbSend className="reel-icon" />
        <FaRegBookmark className="reel-icon" />
      </div>
      <div className="post-info">
        <div className="user-det">
          <img className="reel-user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4y7zVmHqMDDZPFYCAtIvlWWGYofVYEwNg4AyzbXsRg&s" alt="rtyutru" />
          <p>Raghav</p>
          <div className="follower-reel" onClick={handleFollow}>{followed ? "Following" : "Follow"}</div>
        </div>
        <div className="detail">Come On Jeffy</div>
      </div>
    </div>
  )
}

export default ReelCard
