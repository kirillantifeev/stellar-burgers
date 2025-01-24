import { expect, test } from '@jest/globals';
import { TIngredient } from '@utils-types';
import {
  IngredientsState,
  ingredientsSlice,
  getIngredients
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const reducer = ingredientsSlice.reducer;

  const errorTest = new Error('test error');

  test('pending', () => {
    const actualState = reducer(
      {
        ...initialState,
        error: errorTest.message
      },
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  test('fulfielled', () => {
    const ingredient1: TIngredient = {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main',
      _id: '456'
    };

    const ingredient2: TIngredient = {
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      name: 'Филе Люминесцентного тетраодонтимформа',
      price: 988,
      proteins: 44,
      type: 'main',
      _id: '789'
    };

    const expectedIngredients = [ingredient1, ingredient2];

    const expectedState: IngredientsState = {
      ingredients: expectedIngredients,
      loading: false,
      error: null
    };

    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(expectedIngredients, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('error is dispatch', () => {
    const expectedState: IngredientsState = {
      ingredients: [],
      loading: false,
      error: errorTest.message
    };

    const actualState = reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.rejected(errorTest, '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
