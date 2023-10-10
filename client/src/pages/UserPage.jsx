import React, { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { fetchAllVendorsasync, selectAllvendors } from '../features/Product/productSlice';
import {NavLink} from "react-router-dom";
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import { selectRole, selectUser } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vendors = useSelector(selectAllvendors);

  useEffect(()=>{
    dispatch(fetchAllVendorsasync())
  },[dispatch])


  const user = useSelector(selectUser);
  const role = useSelector(selectRole);

  useEffect(()=>{
    if(!user){
      navigate(`/`)
    }
    if(user && role!=="user"){
      navigate(`/${role}`)
    }
  },[navigate,user,role])

  return (
    <div>
       <div className="min-h-screen flex flex-col">
        <Nav/>
      <main className="">
        <Banner/>
        <section className="mb-4 p-8">
          <h2 className="text-xl font-primary mb-2">VENDOR LIST</h2>
          
            <div className="flex gap-2 flex-wrap ">
            {
              vendors.map(vendor=>{
                return(
                  <div className="flex flex-col border-[1px] p-4 items-center gap-2 w-[32%]">
                    <h1 className='font-primary'>{vendor.name}</h1>
                    <h1 className='font-secondary text-xs'>Service: {vendor && vendor.category}</h1> 
                    <p className='font-secondary text-xs'>{vendor.email}</p> 
                    <p className='font-secondary  px-4 py-2 text-xs text-white bg-black'><NavLink to={`/vendors/${vendor._id}`}>Products</NavLink></p>         
                  </div>
                )
              })
            }
         </div>
          
        </section>
        <section className="mb-4 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Order Status</h2>
          <p>
            Here you can check the status of your orders and track their progress.
          </p>
        </section>
      </main>
     </div>
    </div>
  )
}

export default UserPage
