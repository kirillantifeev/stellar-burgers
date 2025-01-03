import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchUser } from '../../slices/authSlice';

export const AppHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return <AppHeaderUI userName={user?.name} />;
};
