import CommentCard from "./CommentCard"
type props = {
    arr:any[]
}
const CommentBox = ({arr}:props) => {
    const uri = 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQadq1dY-23P-ceYTIJ9A4-hulkOzlpSeirGI5bOCk1J4Rjn9C_NMHr-NQnppAJG0-GfP3xgrmJHpykwEM'
  return (
    <div className="post-comment">
        {
            arr?.map((e)=>{
                return <CommentCard uri={uri} username={e?.username} val={e?.val}/>
            })
        }

    </div>
  )
}

export default CommentBox
