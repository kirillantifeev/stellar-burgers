import burgerConstructorReducer, {
  setBun,
  addIngredient,
  removeIngredient,
  ingredientMoveUp,
  ingredientMoveDown,
  clearIngredients
} from './burgerConstructorSlice';

import { TConstructorIngredient } from '../utils/types';
import { burgerConstructorState } from './burgerConstructorSlice';

import { expect, test } from '@jest/globals';

describe('burgerConstructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    _id: '123',
    id: '123'
  };

  const ingredient2: TConstructorIngredient = {
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
    _id: '456',
    id: '456'
  };

  const ingredient3: TConstructorIngredient = {
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
    _id: '789',
    id: '789'
  };

  const ingredient4: TConstructorIngredient = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'bun',
    _id: '789',
    id: '789'
  };

  const ingredient5: TConstructorIngredient = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'main',
    _id: '123',
    id: '123'
  };

  test('addIngredient', () => {
    const initialState: burgerConstructorState = { bun: null, ingredients: [] };

    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient2)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  test('setBun', () => {
    const initialState: burgerConstructorState = {
      bun: ingredient1,
      ingredients: []
    };

    const newState = burgerConstructorReducer(
      initialState,
      setBun(ingredient4)
    );
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...ingredient4,
      id: expect.any(String)
    });
  });

  test('removeIngredient', () => {
    const initialState: burgerConstructorState = {
      bun: null,
      ingredients: [ingredient2]
    };

    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(0)
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  test('ingredientMoveUp', () => {
    const initialState: burgerConstructorState = {
      bun: null,
      ingredients: [ingredient5, ingredient2, ingredient3]
    };

    const newState = burgerConstructorReducer(
      initialState,
      ingredientMoveUp(2)
    );

    expect(newState.ingredients[0]).toEqual(ingredient5);
    expect(newState.ingredients[1]).toEqual(ingredient3);
    expect(newState.ingredients[2]).toEqual(ingredient2);
  });

  test('ingredientMoveDown', () => {
    const initialState: burgerConstructorState = {
      bun: null,
      ingredients: [ingredient5, ingredient2, ingredient3]
    };

    const newState = burgerConstructorReducer(
      initialState,
      ingredientMoveDown(1)
    );

    expect(newState.ingredients[0]).toEqual(ingredient5);
    expect(newState.ingredients[1]).toEqual(ingredient3);
    expect(newState.ingredients[2]).toEqual(ingredient2);
  });
});
