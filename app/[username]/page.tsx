"use client"
import { getFriends, getUserData } from "@app/api/api"
import { AppContext } from "@app/context/MainContext"
import { GiveData } from "@components/GiveData"
import Nav from "@components/Nav"
import PhotoCard from "@components/PhotoCard"
import ProfileComponent from "@components/ProfileComponent"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const page = () => {
  const { state, dispatch } = useContext(AppContext);
  const { username } = useParams();
  const [flag, setFlag] = useState<boolean>(false);
  const user = GiveData()
  const [obj, setObj] = useState<any>()
  const [followed, setFollowed] = useState<Boolean>(false);
  const router=useRouter();

 if(username!==user?.username){
  router.push("/error")
 }

  useEffect(() => {
    (async () => {
      if (user) {
        console.log(user)
        dispatch({ type: 'setLogin', payload: user })
        const res = await getUserData({ username })
        console.log(res)
        setObj(res)
        setFlag(res?.username == user?.username)
        const obj = await getFriends({ username: user?.username })
        const arr = obj?.filter((e: any) => {
          return e?.fUsername == res?.username
        })

      if (arr.length) setFollowed(true)
    }
    })();
}, [])


  useEffect(() => {
    dispatch({ type: 'setLogin' })
  }, [])
return (
  <>

    <ProfileComponent followed={followed} setFollowed={setFollowed} name={obj?.name} username={obj?.username} followers={1000} following={173324} flag={flag} postsArray={obj?.posts} myname={user?.username} />
  </>
)
}

export default page