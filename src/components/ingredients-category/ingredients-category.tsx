import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { RootState } from 'src/services/rootReducer';
import { AppState } from 'src/services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  /** TODO: взять переменную из стора */

  //const ingredientsState = useSelector();

  const constructorItems: any = useSelector<AppState>(
    (state: RootState) => state.burgerConstructor
  );

  // const {ingredientsState} = useSelector(
  //   (state: RootState) => state.burgerConstructor
  // );

  const burgerConstructor = {
    bun: constructorItems.bun,
    ingredients: constructorItems.ingredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
