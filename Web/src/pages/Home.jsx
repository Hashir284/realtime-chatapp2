import React, { useEffect } from 'react'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const logout = () => {
  //     try {
  //       api.post("/auth/logout")
  //       dispatch(setUserData(null))
  //       navigate("/login")
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    // <div onClick={logout}>Home</div>
    <div>Home</div>
  )
}

export default Home