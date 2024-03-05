"use client"
import { getUserData } from "@app/api/api"
import { AppContext } from "@app/context/MainContext"
import { GiveData } from "@components/GiveData"
import Nav from "@components/Nav"
import PhotoCard from "@components/PhotoCard"
import ProfileComponent from "@components/ProfileComponent"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const page = () => {
  const { state, dispatch } = useContext(AppContext);
  const {username} = useParams();
  const [flag, setFlag] = useState<boolean>(false);
  const user = GiveData()
  const [obj, setObj] = useState<any>()
  useEffect(()=>{
     (async()=>{
    if(user){
    console.log(user)
    dispatch({type:'setLogin', payload:user})
    const res = await getUserData({username})
    setObj(res)
    setFlag(res?.username == user?.username)
    }
    })();
  },[])
  
  useEffect(() => {
    dispatch({ type: 'setLogin' })
  }, [])
  return (
     <>
     
     <ProfileComponent name={obj?.name} username={obj?.username} followers={1000} following={173324} flag={flag} postsArray = {obj?.posts}/>
     </>
  )
}

export default page