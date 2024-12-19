import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { error } from 'console';

interface OrderState {
  order: TNewOrderResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (data: string) => {
    const res = await orderBurgerApi(data);
    //console.log(res)
    return res;
  }
);

const orderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error registering user';
      });
  }
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
