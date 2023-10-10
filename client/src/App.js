import React, { useEffect } from 'react'
import {Routes,Route} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import SignupPage from './pages/SignupPage';
import ProductList from './features/Product/components/ProductList';
import { authAsync } from "./features/auth/authSlice";
import { useDispatch } from 'react-redux';
import Cart from './features/Cart/components/Cart'
import UserPage from './pages/UserPage';
const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(authAsync());
  },[dispatch])
  return (
    <>
     <Toaster position="top-left"/>
   <Routes>
     <Route path="/login" Component={LoginPage}></Route>
     <Route path='/signup' Component={SignupPage}></Route>
     <Route path='/user' Component={UserPage}></Route>
     <Route path='/cart' Component={Cart}></Route>
   </Routes>
   </>
  )
}

export default App
