import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsasync, selectAllProducts } from '../productSlice';
import { addToCartAsync, selectItems } from "../../Cart/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllProductsasync());
  },[dispatch]);

  const items = useSelector(selectItems);


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
    <div className='mx-8 mt-8'>
       <div className="flex gap-2 flex-wrap justify-between">
          {
            product.map(product=>{
              return(
                <div className="flex flex-col items-center gap-2 w-[30%]">
                  <div className="w-full">
                    <img src={product && product.productImage} className='w-full' alt="" />
                  </div>
                  <h1 className='font-primary'>{product && product.name}</h1>
                  <div className="flex justify-between gap-4 w-full">
                  <div className='font-secondary  px-4 py-2 text-xs text-white bg-black' onClick={e=>handleCart(product._id)}>Add to Cart</div>
                  <p className='font-primary text-red-600'>Rs. {product && product.price}</p>
                  </div>
                </div>
              )
            })
          }
       </div>
    </div>
  )
}

export default ProductList
