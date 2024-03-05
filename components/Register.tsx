"use client"
import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import ButtonPrimary from "./ButtonPrimary"
import { getAllUsersName, handleRegisterAPI } from "@app/api/api"
import { useRouter } from 'next/navigation'
const Register = () => {
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [username, setUserName] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [userNameArray, setUserNameArray]=useState<any>([])
    const router = useRouter()
    useEffect(()=>{
      const getArray =async()=>{
        const obj = await getAllUsersName()
        console.log(typeof obj, obj)
        setUserNameArray(obj)
      }
      getArray();
    },[])
    useEffect(()=>{
      if(userNameArray)
      console.log(userNameArray)
      function check(){
        if(username && userNameArray  )
      {
        var st = 0;
        var en = userNameArray?.length as number;
        while(st <= en)
        {
          var mid = (st + en)/2;
          const midElem = userNameArray[mid]?.username;
          console.log(username , midElem)
          if(midElem == username)
          {
            return true;
          }
          else if(username < midElem)
          {
            en = mid - 1;
          }
          else
          {
            st = mid + 1;
          }
        }
        return false;
      }
      }
      const elem = document.getElementById('Username');
      if(check())
      {
        console.log(true)
        elem?.classList.remove('greenbox')
        elem?.classList.add('redbox')
      }
      else{
        console.log(false)
        elem?.classList.remove('redbox')
        elem?.classList.add('greenbox')
      }
    },[username, userNameArray])
    const handleRegister = async()=>{
        const formData = {email:id, name, password:pass, username};
        console.log(formData)
        const response = await handleRegisterAPI(formData)
        console.log(response);
        if(response.status == 200)
        {
          router.push("/")
        }
    }
  return (
    <div className="register-main">
        <div className="register">
      <img className="loginLogo"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsGUMX5_VbQJQ4OpHr0SWdUin5PjJyLmfQ7Zzd8JyGA&s" alt="InstaLogo" />
      <h4 className="suggestionHeader">
      Sign up to see photos and videos from your friends.
      </h4>
      <InputBox placeText="Mobile Number or Email" type="text" val={id} setVal={setId}/>
      <InputBox placeText="Full Name" type="text" val={name} setVal={setName}/>
      <InputBox placeText="Username" type="text" val={username} setVal={setUserName} />
      <InputBox placeText="password" type="text" val={pass} setVal={setPass}/>
      <p className="suggestionHeader">People who use our service may have uploaded your contact information to Instagram. Learn More

By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
      <ButtonPrimary buttonValue="Sign up" onclickFun={handleRegister}/>
      </div>
    </div>
  )
}

export default Register
