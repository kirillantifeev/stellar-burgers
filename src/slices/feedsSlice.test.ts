import { expect, test } from '@jest/globals';
import { getFeeds, FeedsState, feedsSlice } from './feedSlice';
import { TOrder } from '@utils-types';
import { TFeedsResponse } from '@api';

describe('feedSlice', () => {
  const initialState: FeedsState = {
    orders: {
      orders: [],
      total: 0,
      totalToday: 0,
      success: false
    },
    loading: false,
    error: null
  };

  test('pending is dispatch', () => {
    const reducer = feedsSlice.reducer;
    const actualState = reducer(
      {
        ...initialState
      },
      getFeeds.pending('')
    );

    expect(actualState).toEqual({
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: true,
      error: null
    });
  });

  test('fulfilled is dispatch', () => {
    const expectedOrders: TOrder = {
      createdAt: '2025-01-22T08:15:18.530Z',
      ingredients: ['ingredient1', 'ingredient2', 'ingredien3'],
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      number: 66387,
      status: 'done',
      updatedAt: '2025-01-22T08:15:19.133Z',
      _id: '6790a916133acd001be4bfce'
    };

    const expectedOrder: TFeedsResponse = {
      orders: [expectedOrders],
      total: 1,
      totalToday: 1,
      success: true
    };

    const reducer = feedsSlice.reducer;
    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getFeeds.fulfilled(expectedOrder, '')
    );

    expect(actualState).toEqual({
      orders: {
        orders: [expectedOrders],
        total: 1,
        totalToday: 1,
        success: true
      },
      loading: false,
      error: null
    });
  });

  test('error is dispatch', () => {
    const errorTest = new Error('error Test');

    const expectedState: FeedsState = {
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: false,
      error: errorTest.message
    };

    const reducer = feedsSlice.reducer;
    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getFeeds.rejected(errorTest, '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
