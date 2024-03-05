'use client'
type props={
    val:string,
    uri1:string,
    uri2:string,
    flag:Boolean
}
const NotificationCard = ({val, uri1, uri2, flag}:props) => {
  return (
    <div className="noti-card">
    <img src={uri1} alt="" className="imgCircle" />  
    <p className="txt3">{val}</p>
    {flag && <img src={uri2} alt="" className="imgSq" />}
    </div>
  )
}

export default NotificationCard
