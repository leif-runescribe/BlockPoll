import React, { useContext } from 'react'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Vote from './pages/Vote';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Voted from './pages/Voted';
import { UserContext, UserProvider } from './context/UserContext';
import Results from './pages/Results';
const App = () => {

  const {user} = useContext(UserContext)
  return (
    <UserProvider>
    <div>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
          {/* <Route path="/vote" element={user?<Vote/>:<Navigate to='/login' />}/> */}
          <Route path = '/vote' element={<Vote/>}/>
          <Route path='/voted' element={<Voted/>}/>
         
          <Route path='/admin'element={<AdminLogin/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/results' element={<Results/>}/>
          
        </Routes>
      
  </div>
  </UserProvider>
  )
}

export default App