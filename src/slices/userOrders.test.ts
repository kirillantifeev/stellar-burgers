import { expect, test } from '@jest/globals';
import { OrdersState, userOrders, getOrders } from './userOrders';
import { TFeedsResponse } from '../utils/burger-api';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const initialState: OrdersState = {
    orders: {
      orders: [],
      total: 0,
      totalToday: 0,
      success: false
    },
    loading: false,
    error: null
  };

  const reducer = userOrders.reducer;
  const errorTest = new Error('test error');

  test('pending', () => {
    const actualState = reducer(
      {
        ...initialState,
        error: errorTest.message
      },
      getOrders.pending('')
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

  test('fulfilled', () => {
    const expectedOrder: TOrder = {
      createdAt: '2025-01-22T08:15:18.530Z',
      ingredients: ['ingredient1', 'ingredient2', 'ingredien3'],
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      number: 66387,
      status: 'done',
      updatedAt: '2025-01-22T08:15:19.133Z',
      _id: '6790a916133acd001be4bfce'
    };

    const expectedOrders: TFeedsResponse = {
      orders: [expectedOrder],
      total: 0,
      totalToday: 0,
      success: true
    };

    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getOrders.fulfilled(expectedOrders.orders, '')
    );

    expect(actualState).toEqual({
      orders: {
        orders: [expectedOrder],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: false,
      error: null
    });
  });

  test('error is dispatch', () => {
    const expectedState: OrdersState = {
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: false,
      error: errorTest.message
    };

    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getOrders.rejected(errorTest, '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
