import React, {  useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { loginAsync,redirectToLogin,selectisSuccess,selectError, clearError, Status} from '../authSlice';
import {useNavigate} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector(selectisSuccess);
  const error = useSelector(selectError);
  const status = useSelector(Status);

  

  const [signupData,setSignupData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event)=>{
    const { name, value } = event.target; 
    setSignupData({ ...signupData, [name]: value });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(loginAsync(signupData));
  }

  useEffect(()=>{
    if (isSuccess) {
      dispatch(redirectToLogin());
      navigate("/");
    }
  },[dispatch,isSuccess,navigate])

  
  useEffect(()=>{
    if(error && error !== "Unauthorized"){
         toast.error(error);
         dispatch(clearError())
    }
   
  },[error,dispatch])
  

  return (
    <div className="">
    <div className='flex items-center justify-center h-screen '>
      {/* Form Section: Start */}
      <div className="w-1/2 flex flex-col gap-[30px] items-center py-[80px]">
       <div className="w-full">
          <div className='w-[24%] mx-auto'></div>
          <h3 className="text-sm text-center  font-primary">Log in to your Account!</h3>
        </div> 
       <form className='flex flex-col w-full items-center justify-center gap-4' onSubmit={handleSubmit}>
       <input placeholder='Enter Your email' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="email" name='email' id='email' onChange={handleInputChange}/>
       <input placeholder='Enter Your password' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='password' id='password' onChange={handleInputChange}/>
       <div className="w-full flex gap-2 items-center justify-center flex-col">
       <p className='text-right w-1/2 font-primary text-xs text-red-500 cursor-pointer'><NavLink to="/forgetpassword">Forget Password?</NavLink></p>
       <button type="submit" className={`w-1/2 py-3 mt-4 bg-black text-white font-secondary ${status==="loading"?"bg-gray-500 cursor-not-allowed":""}`}>Login</button>
       </div>
       <p className='text-center  font-secondary tracking-wide text-sm'><NavLink to="/signup">Don't Have an Accout?</NavLink></p>
       </form>
       </div>
       </div>
    </div>
  )
}

export default Login;
