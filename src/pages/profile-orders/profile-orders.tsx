import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  AppDispatch,
  AppState,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import {
  getOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
  userOrders
} from '../../slices/userOrders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  //const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders.orders} />;
};
