import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { fetchUser } from '../../slices/authSlice';

// const {user} = useSelector((state: RootState) => state.auth)

// const dispatch = useDispatch<AppDispatch>();

// useEffect(() => {
//     dispatch(fetchUser())
//     console.log(user)
//   }, [dispatch])

export const AppHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return <AppHeaderUI userName={user?.name} />;
};
