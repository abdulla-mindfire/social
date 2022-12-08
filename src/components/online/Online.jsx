import "./online.css";
import extUri from "../../config"

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || extUri().PF;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user?.profile_image !== "" ? user.profile_image : PF + "Blank-Avatar.png"} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.first_name + " " + user.last_name}</span>
    </li>
  );
}
