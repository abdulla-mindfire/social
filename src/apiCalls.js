import axios from 'axios'
import extUri from "./config"

const API_BE = process.env.REACT_APP_API_BE || extUri().API_BE

export const loginCall = async (userCreds, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try{
        const res = await axios.post(API_BE + "account/login", userCreds)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        localStorage.setItem('user', JSON.stringify(res.data))
        return res
    }catch(error){
        dispatch({ type: "LOGIN_FAILURE", payload: error })
        return error
    }
}