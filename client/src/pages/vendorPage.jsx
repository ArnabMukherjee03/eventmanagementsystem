import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import VendorItem from '../features/Product/components/VendorItem';
import { useSelector } from 'react-redux';
import { selectRole, selectUser } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const VendorPage = () => {
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(!user){
      navigate(`/`)
    }
    if(user && role!=="vendor"){
      navigate(`/${role}`)
    }
  },[navigate,user,role])
  return (
    <div>
      <Banner/>
      <VendorItem/>
    </div>
  )
}

export default VendorPage;
