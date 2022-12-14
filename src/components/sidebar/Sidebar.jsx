import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import extUri from '../../config'

export default function Sidebar() {
  const API_BE = process.env.REACT_APP_API_BE || extUri().API_BE
  const [friends, setFriends] = useState([])
  const {user} = useContext(AuthContext)

  const fetchFriends = async () => {
    let headers = {
      "Authorization": `Bearer ${user?.access}`
    }
    const res = await axios.get(API_BE + `account/user-followings/${user?.id}`, {headers: headers})
    if(res.status === 200){
      setFriends(res.data)
    } 
  }

  useEffect(()=>{
    fetchFriends()
  }, [user?.id])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/messanger'}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends?.map((u) => (
            <Link style={{textDecoration: "none", color: "black"}} key={u?.id} to={`/profile/${u?.id}`}>
              <CloseFriend key={u?.id} user={u} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
