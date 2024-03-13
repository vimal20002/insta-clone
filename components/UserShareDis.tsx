import Link from "next/link";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

type props={
    name:String,
    targetmail:string,
    setTargetMail:(targetmail:string)=>void
}
const UserShareDis = ({name,  setTargetMail, targetmail}:props) => {
    const [flag, setFlag] = useState<Boolean>(false)
    const handleSelect=()=>{
        setFlag(true)
        setTargetMail(targetmail)
    }
  return (
    <Link href={`/${targetmail}`}>
    <div className="userSh" onClick={handleSelect}>
      <img src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQadq1dY-23P-ceYTIJ9A4-hulkOzlpSeirGI5bOCk1J4Rjn9C_NMHr-NQnppAJG0-GfP3xgrmJHpykwEM" alt="" className="imgCircle" />
      <p className="sernamedisplay">{name}</p>
      <div className="checkmark">
      {
        flag && <IoCheckmarkCircle />
      }
      </div>
    </div>
    </Link>
  )
}

export default UserShareDis
