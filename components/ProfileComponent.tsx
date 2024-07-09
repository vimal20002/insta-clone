import { follow, unfollow } from "@app/api/api"
import Gallery from "./Gallery"
import { PorfileInformation } from "@Interfaces"



const ProfileComponent = ({followed, setFollowed, flag, postsArray, followers, following, name,username, myname}:PorfileInformation) => {
    
      const handleClick=async()=>{
        if(followed)
        {
          await unfollow({username, myname})
        }
        else
        {
          await follow({username, myname})
        }
       setFollowed(!followed);
      }

  return (
    <>
    <div className="profile-main">


      <img src="https://imgs.search.brave.com/zLw0lFjJZqRWUIB0njJkgY05PZ0RMWhPkfzHtD_tUnE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bGl2ZW1pbnQuY29t/L2xtLWltZy9pbWcv/MjAyMy8wOC8yNi82/MDB4MzM4L1RFU0xB/LU1VU0stU0VDLTBf/MTY5Mjk1MjA1ODY0/MF8xNjkzMDQwNjk0/ODYzLkpQRw"
        className="profile-image" alt="ghfgh"
      />


      <div className="informations">


        <div className="name-options">
          <div className="user-title"><span className="username">{username}</span></div>
          {
            flag ?   <div className="edit-profile-opt">Edit Profile</div>
          :    <div className={followed ? "followed-opt" : "follow-opt"}
          onClick={handleClick}
          > {followed ? "Following" : "Follow"}</div>
          }
        </div>

        <div className="follower-info">
          <span className="follower-info-span"><h4>{postsArray?.length || 0}</h4> Posts</span>
          <span className="follower-info-span"><h4>{followers}</h4> Followers</span>
          <span className="follower-info-span"><h4>{following}</h4>Following</span>
        </div>

      </div>

    

    </div>
      <div className="user-info">
      <span className="user-title">{name}</span>
     </div>
     <div className="line"></div>
     <Gallery data={postsArray}/>
     </>
  )
}

export default ProfileComponent;