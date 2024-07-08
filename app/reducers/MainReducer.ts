import { ActionType, initProps } from "@Interfaces"



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

 