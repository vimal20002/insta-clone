type postcommentprops = {
    count:number
}
const PostCommentCount:React.FC<postcommentprops> = ({count}):JSX.Element => {
  return (
    <div>
      <p className="postcommentcount">View all {count} comments</p>
    </div>
  )
}

export default PostCommentCount
