import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'src/services/store';
import { RootState } from '../../services/rootReducer';
import { useNavigate } from 'react-router-dom';
import { makeOrder } from '../../slices/orderSlice';
import { clearIngredients } from '../../slices/burgerConstructorSlice';
//import { <BurgerConstructorSlice></BurgerConstructorSlice> } from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const constructorItems: any = useSelector<AppState>(
    (state: RootState) => state.burgerConstructor
  );

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  type TconstructorItems = {
    bun: TIngredient;
    ingredients: TIngredient[];
  };

  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { error, isLoading, order } = useSelector(
    (state: RootState) => state.order
  );

  BurgerConstructor;

  const orderRequest = isLoading;

  const orderModalData = order?.order || null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }

    if (!constructorItems.bun || orderRequest) return;

    if (isLoggedIn) {
      const ingredientIds = constructorItems.ingredients.map(
        (ingredient: TIngredient) => ingredient._id
      );
      const ConstructorIngredientsIds = ingredientIds.push(
        constructorItems.bun._id,
        constructorItems.bun._id
      );
      dispatch(makeOrder(ingredientIds));

      setIsModalOpen(true);
    }
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);

    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isModalOpen={isModalOpen}
    />
  );
};
