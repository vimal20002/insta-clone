type PostCaptionProps  = {
    name:string,
    caption?:string
}
const PostCaption:React.FC<PostCaptionProps> = ({caption, name}):JSX.Element => {

  return (
    <div>
    <span><h4 style={{display:"inline-block"}}>{name} </h4><p style={{display:"inline-block",marginLeft:"5px"}}>{caption}</p></span>  
    </div>
  )
}

export default PostCaption
