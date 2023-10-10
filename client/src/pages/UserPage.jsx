import React, { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { fetchAllVendorsasync, selectAllvendors } from '../features/Product/productSlice';
const UserPage = () => {
  const dispatch = useDispatch();

  const vendors = useSelector(selectAllvendors);

  useEffect(()=>{
    dispatch(fetchAllVendorsasync())
  },[dispatch])
  return (
    <div>
       <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4">
        <section className="mb-4 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Home</h2>
          <p>
            Welcome to the Home section! This is where you can put information about your home page.
          </p>
        </section>
        <section className="mb-4 p-4 ">
          <h2 className="text-xl font-primary mb-2">VENDOR LIST</h2>
          
            <div className="flex gap-2 flex-wrap justify-between">
            {
              vendors.map(vendor=>{
                return(
                  <div className="flex flex-col items-center gap-2 w-[30%]">
                    <h1 className='font-primary'>{vendor.name}</h1>
                    <h1>{vendor && vendor.category}</h1>  
                    <p className='font-primary text-red-600'>{}</p>
                   
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
