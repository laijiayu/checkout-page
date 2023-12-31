import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

const url = "https://course-api.com/react-useReducer-cart-project"

export const getCartItems = createAsyncThunk("cart/getrCartItems", async (name, thunkAPI) => {
  try {
    const getData = await axios.get(url)
    return getData.data
  } catch (error) {
    return thunkAPI.rejectWithValue("something wrong")
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.price * item.amount
      })
      state.amount = amount
      state.total = total
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals, resetState } = cartSlice.actions
export default cartSlice.reducer
