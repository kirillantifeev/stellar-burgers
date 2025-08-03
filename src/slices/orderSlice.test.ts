import { expect, test } from '@jest/globals';
import { OrderState, makeOrder, orderSlice } from './orderSlice';
import { TOrderResponse, TNewOrderResponse } from '../utils/burger-api';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const initialState: OrderState = {
    order: null,
    isLoading: false,
    error: null
  };

  const reducer = orderSlice.reducer;
  const errorTest = new Error('test error');

  test('pending', () => {
    const actualState = reducer(
      {
        ...initialState,
        error: errorTest.message
      },
      makeOrder.pending('', '')
    );

    expect(actualState).toEqual({
      order: null,
      isLoading: true,
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

    const expectedOrderResponse: TNewOrderResponse = {
      success: true,
      order: expectedOrder,
      name: 'Steeve'
    };

    const expectedState: OrderState = {
      order: expectedOrderResponse,
      isLoading: false,
      error: null
    };

    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      makeOrder.fulfilled(expectedOrderResponse, '', '')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('error is dispatch', () => {
    const expectedState: OrderState = {
      order: null,
      isLoading: false,
      error: errorTest.message
    };

    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      makeOrder.rejected(errorTest, '', '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
