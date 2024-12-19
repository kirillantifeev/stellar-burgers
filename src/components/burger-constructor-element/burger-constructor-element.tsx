import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, RootState } from 'src/services/store';
import { current } from '@reduxjs/toolkit';
import {
  ingredientMoveDown,
  ingredientMoveUp,
  removeIngredient
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const constructorItems: any = useSelector<AppState>(
      (state: RootState) => state.burgerConstructor
    );

    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {
      dispatch(ingredientMoveDown(index));
    };

    const handleMoveUp = () => {
      dispatch(ingredientMoveUp(index));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));

      //alert(index)
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
