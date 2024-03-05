"use client"

import { getPost } from "@app/api/api"
import PostCardLarge from "@components/PostCardLarge"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const {pid} = useParams() 
    const [flag, setFlag] = useState<Boolean>(true)
    const [post, setPost] = useState<any>([])
    useEffect(()=>{
      const fun = async()=>{
      if(pid)
      {
        const res = await getPost({pid})
        console.log(res)
        setPost(res)
      }
    }
    fun()
    },[pid])
  return (
    <div>
      {flag &&<PostCardLarge  comments={post?.comments} imageUri={post?.imageUri} likeCount={post?.likeCount} likedBy={post?.likedBy} username={post?.username} setFlag={setFlag}  pid={pid}/>}
    </div>
  )
}

export default page
