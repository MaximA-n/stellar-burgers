import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  getOrdersApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(
        error.message || 'Ошибка получения данных пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    user: Partial<{ name: string; email: string; password: string }>,
    { rejectWithValue }
  ) => {
    try {
      return await updateUserApi(user);
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(
        error.message || 'Ошибка обновления данных пользователя'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  }
);

export const getOrders = createAsyncThunk(
  'user/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Ошибка загрузки заказов');
    }
  }
);

export const setIsAuthChecked = createAction<boolean>('user/setIsAuthChecked');
