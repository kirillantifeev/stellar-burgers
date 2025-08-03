import { TUser } from '@utils-types';
import {
  authSlice,
  registerUser,
  updateUser,
  loginUser,
  logoutUser,
  fetchUser,
  AuthState
} from './authSlice';
import { TRegisterData } from '../utils/burger-api';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
  };

  const expectedRegisterData: TRegisterData = {
    email: 'sten@mail.ru',
    name: 'sten',
    password: '12345'
  };

  const expectedUserData: TUser = {
    email: 'sten@mail.ru',
    name: 'sten'
  };

  const reducer = authSlice.reducer;
  const errorTest = new Error('test error');

  test('pending registerUser', () => {
    const actualState = reducer(
      {
        ...initialState,
        error: errorTest.message
      },
      registerUser.pending('', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled', () => {
    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      registerUser.fulfilled(expectedUserData, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: expectedUserData,
      isLoggedIn: true,
      isLoading: false,
      error: null
    });
  });

  test('error is dispatch', () => {
    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      registerUser.rejected(errorTest, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: errorTest.message
    });
  });

  test('pending updateUser', () => {
    const actualState = reducer(
      { ...initialState },
      updateUser.pending('', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled updateUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      updateUser.fulfilled(expectedUserData, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: expectedUserData,
      isLoggedIn: true,
      isLoading: false,
      error: null
    });
  });

  test('error is dispatch updateUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      updateUser.rejected(errorTest, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: errorTest.message
    });
  });

  test('pending loginUser', () => {
    const actualState = reducer(
      { ...initialState, error: errorTest.message },
      loginUser.pending('', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled loginUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      loginUser.fulfilled(expectedUserData, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: expectedUserData,
      isLoggedIn: true,
      isLoading: false,
      error: null
    });
  });

  test('error is dispatch loginUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      loginUser.rejected(errorTest, '', expectedRegisterData)
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: errorTest.message
    });
  });

  test('pending logoutUser', () => {
    const actualState = reducer(
      { ...initialState, isLoggedIn: true },
      logoutUser.pending('')
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: true,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled logoutUser', () => {
    const actualState = reducer(
      { ...initialState, isLoggedIn: true, user: expectedUserData },
      logoutUser.fulfilled(null, '')
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null
    });
  });

  test('error is dispatch logoutUser', () => {
    const actualState = reducer(
      { ...initialState, isLoggedIn: true, isLoading: true },
      logoutUser.rejected(errorTest, '')
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: true,
      isLoading: false,
      error: errorTest.message
    });
  });

  test('pending fetchUser', () => {
    const actualState = reducer({ ...initialState }, fetchUser.pending(''));

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled fetchUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      fetchUser.fulfilled(expectedUserData, '')
    );

    expect(actualState).toEqual({
      user: expectedUserData,
      isLoggedIn: true,
      isLoading: false,
      error: null
    });
  });

  test('error is dispatch fetchUser', () => {
    const actualState = reducer(
      { ...initialState, isLoading: true },
      fetchUser.rejected(errorTest, '')
    );

    expect(actualState).toEqual({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: errorTest.message
    });
  });
});
