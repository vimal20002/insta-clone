type props = {
    username:String,
    uri:string,
    val:String
}
const CommentCard = ({username, uri, val}:props) => {
  return (
    <div className="c-card">
      <img src={uri} alt="" className="imgCircle rg" />
      <p className="dark">{username}</p>
      <p>{val}</p>
    </div>
  )
}

export default CommentCard
