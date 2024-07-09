type mainImageProps = {
  uri:string
}
const MainimagePost:React.FC<mainImageProps> = (props):JSX.Element => {
  const {uri}:mainImageProps = props;
  return (
    <div >
      <img className="mainimgPost" src={uri} alt="image" />
    </div>
  )
}

export default MainimagePost
