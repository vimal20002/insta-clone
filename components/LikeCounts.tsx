type LikeCountProps = {
  count:number
}
const LikeCounts = (props:LikeCountProps):JSX.Element => {
  const {count} = props;
  return (
    <div>
      <h4>{count} likes</h4>
    </div>
  )
}

export default LikeCounts
