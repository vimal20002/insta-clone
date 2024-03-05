type mainImageProps = {
  uri:string
}
const MainimagePost:React.FC<mainImageProps> = (props) => {
  const {uri} = props;
  return (
    <div >
      <img className="mainimgPost" src={uri} alt="image" />
    </div>
  )
}

export default MainimagePost
