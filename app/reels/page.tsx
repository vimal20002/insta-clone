"use client"
import ErrorPage from "@components/ErrorPage"
import ReelCard from "@components/ReelCard"


const page = () => {
    const reelArray=[
        {
            vidLink:"/nvideo1.mp4",
            id:"1"
        },
        {
            vidLink:"/nvideo2.mp4",
            id:"2"
        }, {
            vidLink:"/nvideo3.mp4",
            id:"3"
        }, {
            vidLink:"/nvideo4.mp4",
            id:"4"
        },
      ]
  return (
    <div className="reels-pagex">
    {
    reelArray.map((e)=>{
     return <ReelCard vidLink={e?.vidLink} id={e?.id} key={e?.id} />
    })
    }
  
   </div>
  )
}

export default page






