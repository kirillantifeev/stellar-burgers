import { getFeedsApi, getOrdersApi, TFeedsResponse } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

export interface OrdersState {
  orders: TFeedsResponse;
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false
  },
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  console.log(orders);
  return orders;
});

export const userOrders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении данных';
      });
  }
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export default userOrders.reducer;
