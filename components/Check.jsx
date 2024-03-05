'use client'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

 const Check  =()=>{

    const { data }  = useSession();
    useEffect(()=>{
        console.log(data?.friends)
    },[data])
    return <></>

}
export default Check;