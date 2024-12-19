import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface FeedsState {
  orders: TFeedsResponse;
  loading: boolean;
  error: string | null;
}

export const initialState: FeedsState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false
  },
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const feedOrder = await getFeedsApi();
  return feedOrder;
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении данных';
      });
  }
});

export const selectFeeds = (state: RootState) => state.feeds.orders;
export const selectFeedsLoading = (state: RootState) => state.feeds.loading;
export const selectFeedsError = (state: RootState) => state.feeds.error;

export default feedsSlice.reducer;
