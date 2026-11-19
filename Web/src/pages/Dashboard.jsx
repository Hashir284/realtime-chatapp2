import React from 'react'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>{
        api.post("/logout")
        navigate("/login")
    }}>Dashboard</div>
  )
}

export default Dashboard