import { getAllUsers } from "@app/api/api"
import { Socket, io } from "socket.io-client"
type User = any;
 export type initProps ={
    isLogin : boolean,
    isPosting:boolean,
    showNavTitle:boolean,
    showMessageBox:boolean,
    user:Object,
    socket:Socket,
    users:Array<User>
}
export type SetLogin={
    type:'setLogin',
    payload:Object
}
export type SetPosting={
    type:'setPosting'
}
export type NotPosting={
    type:'notPosting'
}
export type ShowNavTitle={
    type:'showNavTitle'
}
export type showMessageBox={
    type:'showMessageBox'
}
export type connectSocket={
    type:'connectSocket',
}
export type disconnectSocket={
    type:'disconnectSocket',
}
export type getUsers={
    type:'setUsers',
    payload:Object
}

export type ActionType = SetLogin | SetPosting | NotPosting | ShowNavTitle | showMessageBox | connectSocket |getUsers | disconnectSocket;
const MainReducer = (initialState:initProps, action:ActionType) => {
     const connectSocket=() => {
        console.log('hey')
        const socketInstance = io('http://localhost:7000')
        socketInstance.on("connect", () => {
            console.log(socketInstance)
            console.log(socketInstance?.id); // x8WIv7-mJelg7on_ALbx
        });
        return socketInstance
    }
    
   switch(action.type)
  {
    
    case 'setLogin':
        return {...initialState,isLogin:true, user:action?.payload};
    case 'setPosting':
        return {...initialState,isPosting:true};  
    case 'notPosting':
        return {...initialState,isPosting:false}
    case 'showNavTitle':
        return {...initialState, showNavTitle:true}  
    case 'showMessageBox':
        return {...initialState, showMessageBox:true}
    case 'connectSocket':
        return {...initialState, socket:connectSocket()}
    case 'disconnectSocket':
        initialState.socket.disconnect();
        return {...initialState}
    case 'setUsers':
        // console.log()
        return {...initialState, users:action?.payload} 
          
  }
}

export default MainReducer;

 