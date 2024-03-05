"use client"


import { useContext, useEffect } from "react"
import Login from "./Login";
import Allstory from "./Allstory";
import PostCard from "./PostCard";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import PostBox from "./PostBox";
import { AppContext} from "@app/context/MainContext";
import { GiveData } from "./GiveData";

const Home = () => {
     const {state,dispatch} = useContext(AppContext);
    const {data} = useSession();
    const user = GiveData()
    useEffect(()=>{
      if(user){
      console.log(user)
      dispatch({type:'setLogin', payload:user})
      }
    },[])
    useEffect(()=>{
      console.log(state?.socket)
      if(state?.socket && data?.user?.email)
      {
        state?.socket.emit("addMe", data?.user?.email)
      }
    },[state])
    if(state?.isLogin && state?.isPosting)
      return (
       <>
      <PostBox/>
       <div className='mainn'>
      <Allstory/>
      <div className="main-home">
        <div className="postCards">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <SideBar />
      </div>

    </div>
       </>
      )
      else if(state?.isLogin && !state?.isPosting)
      return(
         <>
         <div className='mainn'  >
      <Allstory/>
      <div className="main-home">
        <div className="postCards">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <SideBar />
      </div>

    </div>
         </>
      )
      else
      return (
        <>
        <Login/>
        </>
        )
    
     
}

export default Home
