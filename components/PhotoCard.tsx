
type props = {
    imageSource:string
}
const PhotoCard = ({imageSource}:props) => {
  return (
    <div className='photocard-main'>
    <img src={imageSource} alt="gndkvk" />
    </div>
  )
}

export default PhotoCard