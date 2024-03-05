type postcommentprops = {
    count:number
}
const PostCommentCount:React.FC<postcommentprops> = ({count}) => {
  return (
    <div>
      <p className="postcommentcount">View all {count} comments</p>
    </div>
  )
}

export default PostCommentCount
