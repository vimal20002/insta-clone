"use client"
import { AppContext, initialState,} from "@app/context/MainContext"
import MainReducer from "@app/reducers/MainReducer"
import { useReducer } from "react"

const MainProvider = ({children}) => {
    const [state, dispatch] = useReducer(MainReducer, initialState)
  return (
    <AppContext.Provider value={{state,dispatch}}>
      
            {
                children
            }
     
    </AppContext.Provider>
  )
}

export default MainProvider
