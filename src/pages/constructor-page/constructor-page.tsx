import { AppDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  getIngredients,
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = false;
  //const isIngredientsLoading = useSelector(selectIngredientsLoading);

  // const dispatch = useDispatch<AppDispatch>();
  // const ingredients = useSelector(selectIngredients);
  // const loading = useSelector(selectIngredientsLoading);
  // const error = useSelector(selectIngredientsError);

  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, [dispatch]);

  // console.log(ingredients.map((ingredient) => {
  //   if (ingredient.type === 'bun') {
  //     return ingredient
  //   }
  // }));

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
