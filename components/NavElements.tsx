"use client"
import { AppContext } from '@app/context/MainContext'
import React, { useContext } from 'react'

type props={
    ImgLink:string,
    title:string,
    id:string
}
const NavElements = ({ImgLink,title,id}:props) => {
  const {state,dispatch}=useContext(AppContext)
 
    const handleClick=()=>{
      if(title==="Create"){
       dispatch({
        type:'setPosting'
       })
      }
    }
  return (
      <div className={`nav-element ${state.showNavTitle?'wide':''}`} onClick={handleClick}>
        <span className='nav-item-span'>  <img className="nav-element-images" src={ImgLink}  /> <span id={state.showNavTitle?'':'hideNav'}>{title}</span></span>
      </div>
  )
}

export default NavElements
