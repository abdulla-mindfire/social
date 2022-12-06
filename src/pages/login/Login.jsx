import "./login.css";
import { useRef, useContext, useState } from "react"
import { json, useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@material-ui/core"
import Modal from "../../components/modal/Modal"
import axios from "axios";

import extUri from '../../config'

const API_BE = process.env.REACT_APP_API_BE || extUri().API_BE

export default function Login() {
  // Login Section
  const username = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const [slider, setSlider] = useState(false)
  const [formSection, setFormSection] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    let res = await loginCall({ username: username.current.value, password: password.current.value }, dispatch)
    console.log(res,'==')
    if(res?.response?.status !== 200){
      alert(res?.response?.data?.data[0])
    }
  }

  const signUpChange = () => {
    setSlider(true)
    setFormSection(true)
  }

  const loginChange = () => {
    setSlider(false)
    setFormSection(false)
  }


  // Signup Section 
  const signUpUsername = useRef();
  const email = useRef();
  const signUpPassword = useRef();
  const password2 = useRef();
  const history = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()

    if(signUpPassword.current.value !== password2.current.value){
      signUpPassword.current.setCustomValidity("Passwords don't match!");
    }else{
      const userData = {
        username: signUpUsername.current.value,
        email: email.current.value,
        password: signUpPassword.current.value,
        password2: password2.current.value,
        first_name: "",
        last_name: ""
      }
      try{
        const res = await axios.post(API_BE + "account/register", userData);
        console.log(res,'==')
        if(res.status === 201){
          loginChange()
        }
      }catch(err){
        if(err.response.data?.username){
          alert(err.response.data?.username[0])
        }else if(err.response.data?.email){
          alert(err.response.data?.email[0])
        }else{
          alert("Something went wrong please try again!")
          window.location.reload()
        }
      }
    }

  }

  return (
    <div className="body">
      <header>
        <h1 className="heading">Saim Social</h1>
        <h3 className="title">Please login or create a new account!</h3>
      </header>

      <div className="container">
        <div className={slider ? "slider moveslider" : "slider"}></div>
        <div className="btn">
          <button onClick={loginChange} className="login">Login</button>
          <button onClick={signUpChange} className="signup">Signup</button>
        </div>

        <div className={formSection? "form-section form-section-move": "form-section"}>
          <form className="login-box" onSubmit={handleSubmit}>
            <input type="text"
              className="email ele"
              ref={username} 
              placeholder="Username" required/>
            <input type="password"
              className="password ele"
              ref={password} 
              placeholder="password" required />
            <button disabled={isFetching} className="clkbtn">{isFetching ? <CircularProgress color="white" size="20px" /> : "Log In"}</button>
          </form>

          <form className="signup-box" onSubmit={(e)=>handleSignUp(e)}>
            <input type="text"
              className="name ele"
              ref={signUpUsername}
              placeholder="Enter your username" required />
            <input type="email"
              className="email ele"
              ref={email}
              placeholder="youremail@email.com" required />
            <input type="password"
              className="password ele"
              ref={signUpPassword}
              placeholder="password" required />
            <input type="password"
              ref={password2}
              className="password ele"
              placeholder="Confirm password" required />
            <button type="submit" className="clkbtn">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
