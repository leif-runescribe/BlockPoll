import React from 'react'
import Home from './pages/Home'
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Vote from './pages/Vote';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Voted from './pages/Voted';
import { UserProvider } from './context/UserContext';
const App = () => {
  return (
    <UserProvider>
    <div>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
          <Route path="/vote" element={<Vote/>}/>
          <Route path='/voted' element={<Voted/>}/>
         
          <Route path='/admin'element={<Admin/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          
        </Routes>
      
  </div>
  </UserProvider>
  )
}

export default App