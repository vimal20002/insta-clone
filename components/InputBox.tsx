
type Props={
    placeText:string,
    type:string,
    val:string,
    setVal:(val:string)=>void
}

const InputBox = ({placeText,type, val, setVal}:Props) => {
  return (
   
    <input type={type}  placeholder={placeText} className="input-section" id={placeText} value={val} onChange={(e)=>{setVal(e.target.value)}}/>
    

  )
}

export default InputBox
