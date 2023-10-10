import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/Product/productSlice";
import cartReducer from "../features/Cart/cartSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    }
})