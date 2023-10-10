import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsasync, selectAllProducts, selectloading } from '../productSlice';
import { addToCartAsync, selectItems } from "../../Cart/cartSlice";
import {useParams} from "react-router-dom"
import { MutatingDots } from "react-loader-spinner";
import Nav from '../../../components/Nav';
const ProductList = () => {
  const dispatch = useDispatch();

  const {id} = useParams();


  useEffect(()=>{
    dispatch(fetchAllProductsasync(id));
  },[dispatch,id]);

  const items = useSelector(selectItems);
  const status = useSelector(selectloading);

  const product = useSelector(selectAllProducts);

  const handleCart = (id) => {
    if (items.findIndex((item) => item.productId._id === id) < 0) {
      const newItem = {
        productId: id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newItem));
    } else {
      alert("Item Already added");
    }
  };
  

  return (
    <>
    <Nav/>
    <div className='mx-8 pt-8'>
       {
        status === "loading"?
        <div className="flex items-center justify-center h-screen">
           <MutatingDots
                    height="100"
                    width="100"
                    color="#007bff"
                    secondaryColor="#007bff"
                    radius="10"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
        </div>
        :
        <>
        <div className='flex justify-center'>
           <p className='font-secondary text-xl py-[50px]'>{product[0] && product[0].vendorId.name}</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-between">
        {
          product && product.map(product=>{
            return(
              <div className="flex flex-col items-center gap-2 w-[30%]">
                <div className="w-full">
                  <img src={product && product.productImage} className='w-full' alt="" />
                </div>
                <h1 className='font-primary'>{product && product.name}</h1>
                <div className="flex justify-between gap-4 w-full">
                <div className='font-secondary cursor-pointer px-4 py-2 text-xs text-white bg-black' onClick={e=>handleCart(product && product._id)}>Add to Cart</div>
                <p className='font-primary text-red-600'>Rs. {product && product.price}</p>
                </div>
              </div>
            )
          })
        }
     </div>
     </>
       }
    </div>
    </>
  )
}

export default ProductList
