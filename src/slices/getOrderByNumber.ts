import {
  getOrderByNumberApi,
  TNewOrderResponse,
  TOrderResponse
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/services/rootReducer';

export interface OrderState {
  order: TOrderResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrder',
  async (data: number) => {
    const res = await getOrderByNumberApi(data);
    //console.log(res)
    return res;
  }
);

export const getOrder = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при получении данных';
      });
  }
});

export const selectOrder = (state: RootState) => state.getOrder.order;
export const selectOrderLoading = (state: RootState) =>
  state.getOrder.isLoading;
export const selectOrderError = (state: RootState) => state.getOrder.error;

export default getOrder.reducer;
