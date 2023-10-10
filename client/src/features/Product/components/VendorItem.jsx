import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector} from 'react-redux';
import { fetchAllProductsasync, selectAllProducts} from '../productSlice';
import { selectUser } from '../../auth/authSlice';

const VendorItem = () => {
    const dispatch = useDispatch();

    const[name,setName] = useState("");
    const[price,setPrice] = useState("");



    const id = useSelector(selectUser);

    const [update,setUpdate] = useState(false);

    useEffect(()=>{
        dispatch(fetchAllProductsasync(id));
      },[dispatch,id]);
    
    const product = useSelector(selectAllProducts);

    const handleupdate = (name,price) =>{
      setName(name);
      setPrice(price)
      setUpdate(true)
    }

  return (
    <div className='p-8'>
        <h3 className='font-primary'>Product List</h3>
        <div className="flex mt-4 gap-2 flex-wrap justify-between">
        {
          product && product.map(product=>{
            return(
              <div className="flex flex-col items-center gap-2 w-[30%]">
                <div className="w-full">
                  <img src={product && product.productImage} className='w-full' alt="" />
                </div>
                {
                  update?
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} className='font-thin w-full pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
                  :
                  <h1 className='font-primary'>{product && product.name}</h1>
                }
                {
                  update?
                  <input type="text" value={price} onChange={e=>setPrice(e.target.value)} className='font-thin w-full pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
                  :
                  <p className='font-primary text-red-600'>Rs. {product && product.price}</p>
                }
                
                <div className="flex  gap-4 w-full">
                {
                   update?
                   <>
                   <div className="font-secondary cursor-pointer px-4 py-2 text-xs text-white bg-black" onClick={e=>setUpdate(true)}>save</div>
                <div className="font-secondary cursor-pointer px-4 py-2 text-xs text-white bg-black" onClick={e=>setUpdate(false)}>cancel</div>
                   </>
                   :
                   <>
                   <div className="font-secondary cursor-pointer px-4 py-2 text-xs text-white bg-black" onClick={e=>handleupdate(product.name,product.price)}>Update</div>
                <div className="font-secondary cursor-pointer px-4 py-2 text-xs text-white bg-black">Delete</div>
                </>
                }
                
                </div>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default VendorItem;
