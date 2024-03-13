"use client"
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard"
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const data=[
    {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kat"
    },
    {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"sallu"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"abhi"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"aaish"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"srk"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"ranvir"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"vikky"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"karan"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kailashh"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kadkjbdt"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kvnjjdgbat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"djnjggjkat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"dgjkdjkgdkat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kagdkgjdnmt"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kadkgjdbt"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kakdgndt"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kdkngdat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"kgkdngmat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"bhsvskat"
    }, {
        uri:"https://c.ndtvimg.com/2023-11/gfjrd2tg_katrinakaif_640x480_20_November_23.jpg",
        name:"dnjbhkat"
    },
]
const Allstory = () => {
    const [leftvalue, setLeftValue] = useState(0)
    const handleScrollRight = ()=>{
        if(leftvalue>-1050)
        setLeftValue(leftvalue-175)
    }
    const handleScrollLeft = ()=>{
        // if(leftvalue > 0)
        setLeftValue(leftvalue+175)
    }
    useEffect(()=>{
      
    },[leftvalue])
  return (
    <div className="allStory-main" >
    <div className="allStory" id="allstory" style={{left:`${leftvalue}px`}}>
      {
       data.map((e)=>{
        return <StoryCard key={e.name} uri={e.uri} name={e.name} />
       })
      }
    </div>
    <IoIosArrowDroprightCircle className="arrow" onClick={handleScrollRight}/>
    {leftvalue&&
    <IoIosArrowDropleftCircle className="l-arrow" onClick={handleScrollLeft}/>
    }

    </div>
  )
}

export default Allstory
