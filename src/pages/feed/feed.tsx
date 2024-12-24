import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  selectFeeds,
  selectFeedsError,
  selectFeedsLoading
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orderss: TOrder[] = [];

  const dispatch = useDispatch();
  const orders = useSelector(selectFeeds);
  const loading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders.orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
