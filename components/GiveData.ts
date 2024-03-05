import { AppContext } from "@app/context/MainContext";
import { useContext } from "react";

export const GiveData = ()=>{
    if(typeof window !== "undefined" && window?.localStorage)
    {
        const data:any = localStorage.getItem('user')
        const res = JSON.parse(data)
        
        return res;
    }
}