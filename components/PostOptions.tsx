import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import { disLikePost, likePost } from "@app/api/api";
import Link from "next/link";
import { FormData3 } from "@Interfaces";
type props={
  pid:string,
  cnt:number,
  incLike:(cnt:number)=>void,
  liked:Boolean,
  setLiked:(liked:Boolean)=>void,
  me:string,
  setShareBox:(flag:Boolean)=>void,

}
const PostOptions = ({pid, cnt, incLike, liked, setLiked,me, setShareBox}:props):JSX.Element => {
  const handleLikeClick= async():Promise<void>=>{
    setLiked(!liked)
    const formData:FormData3 = {
      pid,
      username:me
    }
    if(!liked){
      console.log("likinggg")
      incLike(cnt+1);
      await likePost(formData)
    }
    else{
      incLike(cnt - 1)
      await disLikePost(formData)
    }
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
