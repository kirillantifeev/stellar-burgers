import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds, selectFeeds } from '../../slices/feedSlice';
import { AppDispatch } from '../../services/store';
import {
  getIngredients,
  selectIngredients
} from '../../slices/ingredientsSlice';
import {
  getOrder,
  getOrderByNumber,
  selectOrder
} from '../../slices/getOrderByNumber';
import { RootState } from 'src/services/rootReducer';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const { number } = useParams(); // Извлечь ID из URL
  const orders = useSelector(selectFeeds);
  const ingredients = useSelector(selectIngredients);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, user, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const orderData = order?.orders.find(
    (order) => order.number === Number(number)
  );

  // const orderData = {
  //   createdAt: '',
  //   ingredients: [],
  //   _id: '',
  //   status: '',
  //   name: '',
  //   updatedAt: 'string',
  //   number: 0
  // };

  //const ingredients =

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
