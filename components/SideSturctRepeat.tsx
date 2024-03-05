import UserDisplay from "./UserDisplay"

type Props={
    name:string,
    buttnpurpose:string
}

const SideSturctRepeat = ({name,buttnpurpose}:Props) => {
  return (
    <div className="sidebar-userStyle">
       <UserDisplay name={name} />
      <p className="switch-text">{buttnpurpose}</p>
    </div>
  )
}

export default SideSturctRepeat
