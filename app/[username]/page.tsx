"use client"
import { getFriends, getUserData } from "@app/api/api"
import { AppContext } from "@app/context/MainContext"
import ErrorPage from "@components/ErrorPage"
import { GiveData } from "@components/GiveData"
import ProfileComponent from "@components/ProfileComponent"
import { AppContextType, UserDetail } from "@Interfaces"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const page = () => {
  const { state, dispatch}: AppContextType = useContext(AppContext);
  const {isLogin} =state;
  const [obj, setObj] = useState<UserDetail>()
  const [followed, setFollowed] = useState<Boolean>(false);

 

useEffect(() => {
  if(localStorage.getItem('user')){
  dispatch({type:'setLogin'}) 
  const userItem=localStorage.getItem('user')
  const userObject:UserDetail = userItem ? JSON.parse(userItem) : null;
  console.log(userObject);
  setObj(userObject)
  }
}, [])

return (
  <>
    {
      isLogin ?
      <ProfileComponent followed={obj?.following} flag={isLogin} setFollowed={setFollowed} name={obj?.name} username={obj?.username} followers={obj?.following?.length || 0}  following={obj?.friends?.length || 0}  postsArray={obj?.posts} myname={obj?.username} />
      : <ErrorPage/>
    }
  </>
)
}

export default page