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
import vendorPage from './pages/vendorPage';
const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(authAsync());
  },[dispatch])
  return (
    <>
     <Toaster position="top-left"/>
   <Routes>
     <Route path="/" Component={LoginPage}></Route>
     <Route path='/signup' Component={SignupPage}></Route>
     <Route path='/user' Component={UserPage}></Route>
     <Route path='/cart' Component={Cart}></Route>
     <Route path='/vendors/:id' Component={ProductList}></Route>
     <Route path='/vendor' Component={vendorPage}></Route>
   </Routes>
   </>
  )
}

export default App
