import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from '../modal/Modal'
import extUri from "../../config"
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function Topbar() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || extUri().PF;
  const API_BE = process.env.REACT_APP_API_BE || extUri().API_BE;


  const [friends, setFriends] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    searchFriends(search)
  }, [search])

  const searchFriends = async(search = "") => {
    try{
      const headers = {
        'Authorization': `Bearer ${user?.access}`
      }
      let res = await axios.get(API_BE + `account/friends?search=${search}`, {headers: headers})
      if(res.status === 200){
        setFriends(res.data)
      }
    }catch(err){}
    
  }
  

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()    
  }

  // console.log(user,'====')

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: "none"}}>
          <span className="logo">Saimsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link style={{textDecoration: "none", color: "white"}} to={'/messanger'}>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <span title={user.username} onClick={() => handleLogout()}>Logout</span>
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user?.id}`}>
          <img src={user?.profile_image ? user.profile_image : PF + "Blank-Avatar.png"} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
