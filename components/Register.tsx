"use client"
import React, { useCallback, useEffect, useState } from "react"
import InputBox from "./InputBox"
import ButtonPrimary from "./ButtonPrimary"
import { getAllUsersName, handleRegisterAPI } from "@app/api/api"
import { useRouter } from 'next/navigation'
import Warning from "./warning/Warning"
import debounce from 'lodash/debounce'
import { UsernameArrayType } from "@Interfaces"





const Register = () => {

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [userNameArray, setUserNameArray] = useState<Array<UsernameArrayType>>();
  const router = useRouter();

  useEffect(() => {
    const getArray = async () => {
      const obj = await getAllUsersName()
      console.log(typeof obj, obj)
      setUserNameArray(obj)
    }
    getArray();
  }, [])

  const checkUserName = (value:string) => {
     const similarUserNames:Array<UsernameArrayType>=userNameArray?.filter((e)=>{
      return e?.username===value
     }) || [];
     if(similarUserNames.length){
       console.log(similarUserNames);
      setWarning("Username Already Exists");
     }
     else{
      setWarning('');
     }
  }

  const debouncedCheckUserName=useCallback(debounce((username:string)=>checkUserName(username)),[username]);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {value}=e?.target;
    setUserName(value);
    debouncedCheckUserName(value);
  }
  const handleRegister = async() => {
  setWarning("Hang Tight. Request In Process")  
  if(id && username && name && pass){
  let formData={
    email:id,
    name,
    username,
    password:pass
  }
  const response =await handleRegisterAPI(formData);
  setWarning(response.message);
  router.push("/login");
  }
  else{
   setWarning("All Fields Are Required")
  }
  }



  return (
    <div className="register-main">
      {
        warning && <Warning message={warning} onClose={() => setWarning('')} />
      }
      <div className="register">
        <img className="loginLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsGUMX5_VbQJQ4OpHr0SWdUin5PjJyLmfQ7Zzd8JyGA&s" alt="InstaLogo" />
        <h4 className="suggestionHeader">
          Sign up to see photos and videos from your friends.
        </h4>
        <InputBox placeText="Mobile Number or Email" type="text" val={id} setVal={setId} />
        <InputBox placeText="Full Name" type="text" val={name} setVal={setName} />
        <input type="text" placeholder="Username" className="input-section" name="username" id="username"
          onChange={handleChange}
        />
        <InputBox placeText="password" type="text" val={pass} setVal={setPass} />
        <p className="suggestionHeader">People who use our service may have uploaded your contact information to Instagram. Learn More

          By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
        <ButtonPrimary buttonValue="Sign up" onclickFun={handleRegister} />
      </div>
    </div>
  )
}

export default Register;
