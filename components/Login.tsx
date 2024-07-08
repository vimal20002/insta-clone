"use client"
import { useContext, useEffect, useState } from "react"
import InputBox from "./InputBox";
import ButtonPrimary from "./ButtonPrimary";
import Link from "next/link";
import { AppContext } from "@app/context/MainContext";
import { handleLogin } from "@app/api/api";
import AlertBox from "./AlertBox";
import {  AppContextType, ErrorRes, FormData, initProps, LoggedInUser } from "@Interfaces";

const Login = () => {
    const { state, dispatch }:AppContextType = useContext(AppContext);
    const [index, setIndex] = useState<number>(2);
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const { isLogin }:initProps = state;



    useEffect(() => {
    }, [isLogin])

    const handleSubmit = async ():Promise<void> => {
        console.log(email, password);
        const formData: FormData = {
            email, password,
            redirect: false
        }
        setEmail("")
        setPassword("")
        let data: LoggedInUser | ErrorRes
        data = await handleLogin(formData)
        if ("message" in data && !data.message)
            localStorage.setItem('user', JSON.stringify(data));
        if ("username" in data && data?.username) {
            setMessage("Logged In !")
            setType("success")
            setIsAlert(true)
            setTimeout(() => {

                dispatch({ type: "setLogin" })
            }, 1000)
        }
        else {

            setMessage("Wrong Credentials")
            setType("error")
        }
        setIsAlert(true)
    }
    setInterval(() => {
        setIndex(index === 1 ? 2 : 1)
    }, 1000)
    useEffect(() => {
        console.log(setIsAlert)
    }, [setIsAlert])

    return (

        <div className="login-main">
            {isAlert && <AlertBox type={type} message={message} onClose={() => setIsAlert(false)} />
            }            <div className="images-section">
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
