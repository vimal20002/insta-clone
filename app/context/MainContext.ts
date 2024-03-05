"use client"


import { initProps } from "@app/reducers/MainReducer"
import React, { createContext, Dispatch } from "react"

export const initialState :initProps = {
    isLogin:false,
    isPosting:false,
    showNavTitle:false,
    showMessageBox:false
  }
export const AppContext=createContext<{state : initProps; dispatch:React.Dispatch<any>}>({state : initialState,dispatch: ()=>null})
