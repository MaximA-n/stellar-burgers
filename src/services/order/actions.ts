import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { clearConstructor } from '../burger-constructor/slice';

interface OrderResponse {
  success: boolean;
  order: TOrder;
  name: string;
}

export const createOrder = createAsyncThunk<OrderResponse, string[]>(
  'order/create',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      dispatch(clearConstructor());
      return data;
    } catch (error: unknown) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Error creating order');
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);
