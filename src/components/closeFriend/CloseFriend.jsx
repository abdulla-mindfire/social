import "./closeFriend.css";
import extUri from "../../config"

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || extUri().PF;;
  return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user?.profile_image ? user?.profile_image : PF + "Blank-Avatar.png"} alt="" />
        <span className="sidebarFriendName">{user?.username}</span>
      </li>
  );
}
