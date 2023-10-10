import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllVendors} from './productApi';

const initialState = {
    products: [],
    status: "idle",
    error: null, 
    vendors:[]
}

// Define your async thunk
export const fetchAllProductsasync = createAsyncThunk(
    'product/getProducts', 
    async (_,{ rejectWithValue }) => {
      try {
        const response = await fetchAllProducts();
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
        
});

export const fetchAllVendorsasync = createAsyncThunk(
  'product/Vendors', 
  async (_,{ rejectWithValue }) => {
    try {
      const response = await fetchAllVendors();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
      
});


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsasync.pending, (state) => {
        state.status = 'loading';
      
      })
      .addCase(fetchAllProductsasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProductsasync.rejected,(state,action)=>{
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchAllVendorsasync.pending, (state) => {
        state.status = 'loading';
      
      })
      .addCase(fetchAllVendorsasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vendors = action.payload;
        state.error = null;
      })
      .addCase(fetchAllVendorsasync.rejected,(state,action)=>{
        state.status = 'rejected';
        state.error = action.payload;
      })
  },
});

export const selectloading = (state) => state.product.status;
export const selectAllProducts = (state) => state.product.products;
export const selectAllvendors = (state) => state.product.vendors;

export default productSlice.reducer;
