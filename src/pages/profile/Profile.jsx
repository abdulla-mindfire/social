import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import React, {useState, useEffect,useContext } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PhotoCamera } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const API_BE = process.env.REACT_APP_API_BE

export default function Profile() {
  const {user:currentUser} = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let { id } = useParams();

  const getProfile = async () => {
    const headers = {
      'Authorization': `Bearer ${currentUser?.access}`
    }
    const res = await axios.get(API_BE + `account/user-profile/${id}`, {headers: headers})
    console.log(res)
    if (res.status === 200){
      setUser(res.data)
    }
  }

  useEffect(() => {
    getProfile()
  },[id])

  const handleUpload = async(e, type) =>{
    console.log(e.target.files[0], type)
    let file = e.target.files[0]
    let data = new FormData()
    if(type === 'cover'){
      data.append('cover_image', file)
    }else{
      data.append('profile_image', file)
    }
    const headers = {
      'Authorization': `Bearer ${currentUser?.access}`
    }
    const res = await axios.patch(API_BE + `account/profile/image-upload`, data, {headers: headers})
    if(res.status === 200){
      let userData = JSON.parse(localStorage.getItem('user'))
      userData['profile_image'] = res.data.profile_image
      localStorage.setItem('user', JSON.stringify(userData))

      window.location.reload()
    }
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            {id == currentUser?.id && <IconButton onChange={(e)=> handleUpload(e, 'cover')} style={{top: "38px"}} color="primary" aria-label="upload picture" component="label">
              <input hidden accept=".png, .jpeg, .jpg, .JPG, .PNG, .JPEG" type="file" />
              <PhotoCamera />
            </IconButton>}
              <img
                className="profileCoverImg"
                src={user?.cover_image || PF + "cover.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user?.profile_image || PF + "Blank-Avatar.png"}
                alt=""
              />
              {id == currentUser?.id && <IconButton onChange={(e)=> handleUpload(e, 'profile')} style={{left: "580px", bottom: "123px"}} color="primary" aria-label="upload picture" component="label">
              <input hidden accept=".png, .jpeg, .jpg, .JPG, .PNG, .JPEG" type="file" />
              <PhotoCamera />
            </IconButton>}
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user?.user?.first_name + " " + user?.user?.last_name}</h4>
                <span className="profileInfoDesc">{user?.about}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {user && <Feed user_id={id} />}
            {user && <Rightbar user={user}/>}
          </div>
        </div>
      </div>
    </>
  );
}
