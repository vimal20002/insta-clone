"use client"


import { useContext, useEffect, useState } from "react"
import Login from "./Login";
import Allstory from "./Allstory";
import PostCard from "./PostCard";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import PostBox from "./PostBox";
import { AppContext} from "@app/context/MainContext";
import { GiveData } from "./GiveData";
import { getFeed } from "@app/api/api";
import ShareUser from "./ShareUser";

const Home = () => {
     const {state,dispatch} = useContext(AppContext);
    const {user, socket, isLogin} = state;
    const[feed, setFeed] = useState<any>([])
    
    useEffect(()=>{
      dispatch({type:'showNavTitle'})
      const fun = async()=>{
      const res = GiveData();
      if(res){
        dispatch({type:"setUser", payload:res})
        dispatch({type:"setLogin"})
      }
      const obj = await getFeed()
      setFeed(obj)
    }
    fun()
    },[])
    useEffect(()=>{
      console.log(user)
      if(socket && user?.email)
      {
        socket.emit("addMe", user?.email)
      }
      // console.log(feed)
    },[user])
  return(
       <>
      {isLogin? <div className='mainn'>
      <Allstory/>
      <div className="main-home">
        <div className="postCards">
          {
            feed?.map((e:any)=>{
              return <PostCard  likedBy={e?.likedBy}  id={e?._id} caption={e?.caption} comment={e?.comment} imageUri={e?.imageUri} likeCount={e?.likeCount} username={e?.username} key={e?._id}/>
            })
          }
        </div>
        <SideBar />
      </div>

    </div>:<Login/>
    }
       </>
      
      
  )
     
}

export default Home
