import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import PassRest from './pages/PassRest'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/verify' element={<Emailverify/>}></Route>
        <Route path='/reset' element={<PassRest/>}></Route>
      </Routes>
    </div>
  )
}

export default App