import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import reducer from './ingredientsSlice';
import { v4 as uuidv4 } from 'uuid';

export interface burgerConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    ingredientMoveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index > 0) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredientToMove);
      }
    },
    ingredientMoveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index < state.ingredients.length - 1) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredientToMove);
      }
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearIngredients,
  ingredientMoveUp,
  ingredientMoveDown
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export default burgerConstructorReducer;
