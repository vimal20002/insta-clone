import LikeCounts from "./LikeCounts"
import MainimagePost from "./MainimagePost"
import PostCaption from "./PostCaption"
import PostCommentCount from "./PostCommentCount"
import PostOptions from "./PostOptions"
import UserdetailPost from "./UserdetailPost"

const PostCard = () => {  
  return (
    <div className="postcard">
      <UserdetailPost name="Rvcjinsta" time="4h"/>
      <MainimagePost uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4y7zVmHqMDDZPFYCAtIvlWWGYofVYEwNg4AyzbXsRg&s"/>
      <PostOptions/>
      <LikeCounts count={3663367}/>
      <PostCaption name="Rvcjinsta" caption="Salar vs Dunki"/>
      <PostCommentCount count={26336}/>
      <hr />
    </div>
  )
}

export default PostCard
