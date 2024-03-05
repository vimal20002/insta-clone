"use client"

import React, { useEffect, useState } from 'react'
import ExploreCard from './ExploreCard'
import { getFeed } from '@app/api/api'
import Gallery from './Gallery'

const Explore = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(()=>{
    const fun = async()=>{
      const res = await getFeed();
      setData(res)
    }
    fun()
  },[])
  useEffect(()=>{
    console.log(data)
  },[data])
 


 
  return (
    <>
   {data.length? <Gallery data={data}/>
    :<h1 style={{textAlign:"center"}}>Loadingggggggggg</h1>}
    </>
  )
}

export default Explore
