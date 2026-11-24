import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'

function App() {
  const {userData} = useSelector(state=>state.user)
      // getCurrentUser()
    // console.log(userData);
    
  return (
    <Routes>
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userData ? <Navigate to="/profile" /> : <SignUp />} />
      <Route path="/" element={userData ? <Home />: <Home />} /> //<Navigate to="/login" />} 
      <Route path="/profile" element={userData ? <Profile />: <Navigate to="/signup" />} />
      <Route path="*" element={userData ? <Home />: <Navigate to="/login" />} />
    </Routes>
  )
}

export default App