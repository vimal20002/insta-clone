import { getAllUsers } from "@app/api/api"
import { Socket, io } from "socket.io-client"
type User = any;
 export type initProps ={
    isLogin : boolean,
    isPosting:boolean,
    showNavTitle:boolean,
    showMessageBox:boolean,
    user:any,
    socket:Socket,
    users:Array<User>,
    searchFlag:Boolean,
    notiFlag:Boolean
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
export type serachFlag={
    type:'setSearchFlag'|'unSetSearchFlag'
}
export type notiFlag={
    type:'setNotiFlag'|'unSetNotiFlag'
}
export type showMessageBox={
    type:'showMessageBox'
}
export type getUsers={
    type:'setUsers',
    payload:Object
}
export type setUser={
    type:'setUser',
    payload:Object
}
export type hideNavTitle={
    type:'hideNavTitle',
    payload:Object
}

export type ActionType = SetLogin | SetPosting | NotPosting | ShowNavTitle | showMessageBox |getUsers  |setUser|hideNavTitle |serachFlag|notiFlag;
const MainReducer = (initialState:initProps, action:ActionType) => { 
   switch(action.type)
  {
    
    case 'setLogin':
        return {...initialState,isLogin:true};
    case 'setPosting':
        return {...initialState,isPosting:true};  
    case 'notPosting':
        return {...initialState,isPosting:false}
    case 'showNavTitle':
        return {...initialState, showNavTitle:true}  
    case 'hideNavTitle':
        return {...initialState, showNavTitle:false} 
    case 'showMessageBox':
        return {...initialState, showMessageBox:true}
    case 'setUsers':
        // console.log()
        return {...initialState, users:action?.payload} 
    case 'setUser':
        return {...initialState, user:action?.payload}   
    case 'setSearchFlag':
        return {...initialState, searchFlag:true} 
    case 'unSetSearchFlag':
        return {...initialState, searchFlag:false} 
    case 'setNotiFlag':
        return {...initialState, notiFlag:true} 
    case 'unSetNotiFlag':
        return {...initialState, notiFlag:false}             
          
  }
}

export default MainReducer;

 