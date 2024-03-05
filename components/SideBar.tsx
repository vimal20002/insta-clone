import SideSturctRepeat from "./SideSturctRepeat"
import UserDisplay from "./UserDisplay"


const SideBar = () => {
    const arr=[
        "vikaspatel","jati.explorewithme","buthwyishouldwxplorewithyou","goodlongday"]
  return (
    <div className="sidebar-main">
     <SideSturctRepeat name={"Katrina bhai"} buttnpurpose={"Switch"}/>
     <div className="suggestedfry">
     <p className="suggestionHeader">Suggested For You</p>
     <p className="suggestionButtn">See All</p>
     </div>
    {arr.map((user)=>{
        return <SideSturctRepeat key={user} name={user} buttnpurpose={"Follow"}/>
    })}
    </div>
  )
}

export default SideBar
