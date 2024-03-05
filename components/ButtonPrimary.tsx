

type Props={
    buttonValue:string,
    onclickFun:()=>void
}
const ButtonPrimary = ({buttonValue, onclickFun}:Props) => {
  return (
    <div>
      <button className="buttonprimary" onClick={onclickFun}>{buttonValue}</button>
    </div>
  )
}

export default ButtonPrimary
