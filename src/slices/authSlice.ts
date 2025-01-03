import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  fetchWithRefresh,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

interface AuthState {
  user: TUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'auth/user',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    //console.log(res.user)
    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (data: TRegisterData) => {
    const res = await updateUserApi(data);
    //alert(res.user)
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    //console.log(res)

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    //console.log(document.cookie)
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const res = await logoutApi();
  console.log(res);
  return null;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await getUserApi();
  console.log('okssssssssss');
  return res.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error registering user';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error login user';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error logging out user';
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error fetching user';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error update user';
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
