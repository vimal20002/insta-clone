"use client"
import { getAllUsers, getFriends } from '@app/api/api';
import { AppContext } from '@app/context/MainContext';
import ButtonPrimary from '@components/ButtonPrimary';
import ChatCard from '@components/ChatCard';
import { GiveData } from '@components/GiveData';
import InputBox from '@components/InputBox';
import MessageBox from '@components/MessageBox';
import Check from '@components/check';

import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
interface IncomingMessage {
    senderId: string;
    message: string;
}
const messages = [
    {senderId:"vdjvjkg", message:"fgjdhfdfv"}
];
const tsize = 0;


const page = () => {
     
    // const [message, setMessage] = useState<string>("")
    const [name, setName] = useState<string| undefined |null>("")
    const [myName, setMyName] = useState<string| undefined |null>("")
    const [email, setEmail] = useState<string | undefined |null>("")

    const [socket, setSocket] = useState<Socket | null>(null)
    const [friendArr, setFriendArr] = useState<any[] >([]);
    const [messages, setMessages] = useState<IncomingMessage[]>([]);
    const [targetmail, setTargetmail] = useState<string>('');
    const { state, dispatch } = useContext(AppContext);
    const {user} = state;
    
    useEffect(()=>{
        const fun = async()=>{
      if(user){
      console.log(user)
      dispatch({ type: 'setLogin' })
            setEmail(user?.email)
            setMyName(user?.name)
            socket?.emit('addMe',user?.email)
            const res = await getFriends({username:user?.username})
            setFriendArr(res)
      }
    }
    fun()
    },[user])
    let sk:Socket | null;
    const connectSocket=() => {
        sk?.disconnect();
        const socketInstance = io('http://localhost:7000')
        socketInstance.on("connect", () => {
            console.log(socketInstance)
            console.log(socketInstance?.id); // x8WIv7-mJelg7on_ALbx
        })
        sk = socketInstance;
        socket?.disconnect()
        setSocket(socketInstance)
    }
    const disconnectSocket = () => {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      };
    useEffect(()=>{
        dispatch({type:'hideNavTitle'})
        const res = GiveData()
        if(res){
          dispatch({type:"setUser", payload:res})
          dispatch({type:'setLogin'})
        }
        const getUserFun = async()=>{
            const friends =  await getAllUsers();
             dispatch({type:'setUsers',payload:friends})
        }
        getUserFun()
        connectSocket()
        return ()=>{disconnectSocket()};
    },[])
    useEffect(() => {
        if (socket && email) {
            socket.on('incomingPrivateMessage', ({ senderId, message }: IncomingMessage) => {
                console.log(message)
                setMessages((prevMessages) => [...prevMessages, { senderId, message}]);
                console.log(email)
            });

        }
       
    }, [socket,email])
    useEffect(()=>{
        if(email)
        {
            socket?.emit('friendsData', email);
        }
        if(targetmail){
            socket?.on('incomingdata',(obj:any)=>{
                setMessages(obj.filter((e:any)=>{
                    return e.fEmail === targetmail;
                })[0]?.messages)
            }) 
        }
    },[email, targetmail])
    const handleSend = (message:string) => {
        console.log(targetmail)
        if (socket && targetmail && message){
            console.log("2 baar")
            socket.emit('privateMessage', { targetmail, email, message })
        }
        let senderId = email || " ";
        setMessages((prevMessages) => [...prevMessages,{senderId, message}]);
        // setMessageList((prev)=>[...prev,message])
    }
    

    return (
      
          <div className="chat-main">
                        <div className="chat-op">
                            <h2 className='you'>{myName}</h2>
                            <h4 >Messages</h4>
                            <div className="chat-cards">
                                {
                                    friendArr?.map((e:any)=>{
                                         if(e?.email !== email)
                                    return <ChatCard imgUri='' lastMessage={e?.messages[e?.messages?.length - 1]?.message||"Say hello to new friend"} name={e?.fUsername} sid = {e?.fEmail} setTargetmail={setTargetmail} setName = {setName} />
                                    })
                                }
                            </div>
                        </div>
                           { 
                           state?.showMessageBox ? <MessageBox handleSend = {handleSend} messages = {messages}  name = {name} email = {email}/> : 
                           <div className="message-main">
                           <div className="message-temp">
                           <img className='messageIcon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyEyvjIEJudLcRVetg5_OUw1YzBIBI-CKAKmilSgu_A&s" alt="message" />
                           <h4>Your Messages</h4>
                           <p>Send private photos and messages to a friend or group</p>
                           </div>
                       </div>
                           }
                           
                       
        </div>

    )
}

export default page
