import ExploreCard from "./ExploreCard"

type props = {
    data:any[]
}
const Gallery = ({data}:props) => {
  return (
    <div className='explore-main'  >
    {data?.map((e:any)=>{
    return <ExploreCard imageUrl={e?.imageUri} likes={e?.likeCount} comments={e?.comments.length}   />
    })
  }
    
    </div>
  )
}

export default Gallery
