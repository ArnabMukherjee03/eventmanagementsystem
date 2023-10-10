import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
} from "./cartApi";
import { toast } from "react-hot-toast";

const initialState = {
  status: "idle",
  items: [],
  cartLoaded: false,
  updateStatus: 'idle',
  error: null,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await addToCart(item);
      toast.success("Added to Cart");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchItemsByUserId();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update, { rejectWithValue }) => {
    try {
      const response = await updateCart(update);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await deleteItemFromCart(itemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
        state.error = null;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.cartLoaded = false;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.updateStatus = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items[index] = action.payload;
        state.error = null;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.updateStatus = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload.id
        );

        console.log(index);
        state.items.splice(index, 1);
        state.error = null;
      })
      .addCase(deleteItemFromCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export const selectError = (state) => state.cart.error;
export const selectUpdateStatus = (state) => state.cart.updateStatus;

export default cartSlice.reducer;
