import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  AppDispatch,
  AppState,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import {
  getFeeds,
  selectFeeds,
  selectFeedsError,
  selectFeedsLoading
} from '../../slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  //const orders: TOrder[] = [];
  const feed = {};

  const dispatch = useDispatch();
  const orders = useSelector(selectFeeds);
  const loading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);

  // useEffect(() => {
  //   dispatch(getFeeds());
  // }, [dispatch]);

  const readyOrders = getOrders(orders.orders, 'done');

  const pendingOrders = getOrders(orders.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={orders}
    />
  );
};
