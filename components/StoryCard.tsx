type Props={
    uri:string,
    name:string,
}
const StoryCard = ({uri, name}:Props) => {
    const username = name.substring(0,7);
  return (
    <div className="storyCard-main">
        <div className="whiteb">
      <img src={uri} alt="photo" className="storyImg" />
      </div>
      <p>{username}{name.length>7?"...":""}</p>
    </div>
  )
}

export default StoryCard
