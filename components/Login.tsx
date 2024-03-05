"use client"
import { useContext, useEffect, useState } from "react"
import InputBox from "./InputBox";
import ButtonPrimary from "./ButtonPrimary";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AppContext } from "@app/context/MainContext";
import { handleLogin } from "@app/api/api";

const Login = () => {
    const { state,dispatch } = useContext(AppContext);
    const [index, setIndex] = useState(2);
    const [email, setEmail] = useState("");
    const [ok, setOk] = useState<boolean>()
    const [password, setPassword] = useState("");
    useEffect(() => {
    }, [state?.isLogin])
    const handleSubmit = async () => {
        const formData = {
            email, password,
            redirect: false
        }
        setEmail("")
        setPassword("")
        const data = await handleLogin(formData)    
        localStorage.setItem('user', JSON.stringify(data));  
    }
    const intervalId = setInterval(() => {
        if (index === 2) {
            setIndex(1);
        }
        else {
            setIndex(2);
        }
    }, 2000)
    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000)
    return (

        <div className="login-main">
            <div className="images-section">
                <img src="/loginmain.png" className="loginmainimage" alt="" />
                <img src={`/loginphoto${index}.png`} className="loginsecondaryimage" alt="" />
            </div>
            <div className="loginForm-main">
                <div className="loginForm">
                    <img className="loginLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsGUMX5_VbQJQ4OpHr0SWdUin5PjJyLmfQ7Zzd8JyGA&s" alt="InstaLogo" />
                    <InputBox placeText="Phone number,username or email" type="text" val={email} setVal={setEmail} />
                    <InputBox placeText="Password" type="password" val={password} setVal={setPassword} />
                    <ButtonPrimary buttonValue="Log in" onclickFun={handleSubmit} />
                    <p className="suggestionHeader">Forgot Password ?</p>
                </div>
                <div className="signupop">
                    <p>Don't have a account ? </p>
                    <Link href="/register">
                        <span className="signuptext">Sign up</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login
