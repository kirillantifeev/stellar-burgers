import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  AppDispatch,
  AppState,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { fetchUser, registerUser } from '../../slices/authSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const name = userName;
    dispatch(registerUser({ email, name, password }));
  };

  //console.log(fetchUser())
  // dispatch(fetchUser())
  //   console.log(fetchUser)

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
