"use client"
import { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import ButtonPrimary from "./ButtonPrimary";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AppContext } from "@app/context/MainContext";
import { handleLogin } from "@app/api/api";

const Login = () => {
    const { state, dispatch } = useContext(AppContext);
    const [index, setIndex] = useState(2);
    const [email, setEmail] = useState("");
    const [ok, setOk] = useState<boolean>();
    const [password, setPassword] = useState("");
    const { isLogin } = state;
    
    useEffect(() => {}, [isLogin]);
    
    const handleSubmit = async () => {
        console.log(email, password);
        const formData = { email, password, redirect: false };
        setEmail("");
        setPassword("");
        const data = await handleLogin(formData);
        localStorage.setItem('user', JSON.stringify(data));
        if (data?.username) {
            dispatch({ type: "setLogin" });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => prevIndex === 2 ? 1 : 2);
        }, 2000);
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 5000);
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                    <img src="/loginmain.png" className="w-1/2 h-1/2 object-cover" alt="Login Main" />
                    <img src={`/loginphoto${index}.png`} className="absolute top-0 left-0 w-1/2 h-66 object-cover" alt="Login Secondary" />
                </div>
                <div className="p-8 md:w-1/2">
                    <div className="flex flex-col items-center mb-4">
                        <img className="w-24 mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsGUMX5_VbQJQ4OpHr0SWdUin5PjJyLmfQ7Zzd8JyGA&s" alt="InstaLogo" />
                        <InputBox placeText="Phone number, username or email" type="text" val={email} setVal={setEmail} />
                        <InputBox placeText="Password" type="password" val={password} setVal={setPassword} />
                        <ButtonPrimary buttonValue="Log in" onclickFun={handleSubmit} />
                        <p className="mt-4 text-sm text-gray-600">Forgot Password?</p>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-sm">Don't have an account?</p>
                        <Link href="/register">
                            <span className="ml-2 text-sm text-blue-500">Sign up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
