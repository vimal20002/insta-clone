import UserDisplay from "./UserDisplay";

type UserDetailProps = {
  name:string,
  time:string
}
const UserdetailPost:React.FC<UserDetailProps> = (props) => {
  const {name, time} = props;
  return (
    <div className="userDetailPost">
       <UserDisplay name={name}/>
       <div className="timer">
       <div className="dot"></div>
        <span className="timePost">{time}</span>
       </div>
      
        <div className="threeDot"><h1> ...</h1></div>
    </div>
  )
}

export default UserdetailPost
