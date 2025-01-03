import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  AppDispatch,
  AppState,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { fetchUser, updateUser } from '../../slices/authSlice';
import { Preloader } from '../../components/ui';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const { isLoading, error, user, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    // dispatch(fetchUser())
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <ProfileUI
          formValue={formValue}
          isFormChanged={isFormChanged}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );

  //return null;
};
