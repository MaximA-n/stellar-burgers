import { TOrder, TUser } from '@utils-types';
import userReducer, { clearError, initialState } from './slice';
import {
  getOrders,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  setIsAuthChecked,
  updateUser
} from './actions';

const mockUser: TUser = {
  email: 'test@gmail.com',
  name: 'test'
};

const mockOrders: TOrder[] = [
  {
    _id: '699c6469a64177001b32d13c',
    status: 'done',
    name: 'Био-марсианский краторный бургер',
    createdAt: '2026-02-23T14:30:01.362Z',
    updatedAt: '2026-02-23T14:30:01.615Z',
    number: 101550,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ]
  }
];

describe('user slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('setIsAuthChecked — должен устанавливать isAuthChecked', () => {
    const state = userReducer(initialState, setIsAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('getUser.pending — должен установить loading: true', () => {
    const state = userReducer(initialState, { type: getUser.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getUser.fulfilled — должен записать пользователя и isAuthChecked: true', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('getUser.rejected — должен записать ошибку и isAuthChecked: true', () => {
    const action = {
      type: getUser.rejected.type,
      payload: 'Ошибка авторизации'
    };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('loginUser.pending — должен установить loading: true', () => {
    const state = userReducer(initialState, { type: loginUser.pending.type });
    expect(state.loading).toBe(true);
  });

  it('loginUser.fulfilled — должен записать пользователя', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: mockUser,
        accessToken: 'Bearer token',
        refreshToken: 'refresh',
        success: true
      }
    };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('loginUser.rejected — должен записать ошибку', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Неверный пароль'
    };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Неверный пароль');
  });

  it('registerUser.fulfilled — должен записать пользователя', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: mockUser,
        accessToken: 'Bearer token',
        refreshToken: 'refresh',
        success: true
      }
    };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('logoutUser.fulfilled — должен очистить пользователя и заказы', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      orders: mockOrders
    };
    const state = userReducer(stateWithUser, {
      type: logoutUser.fulfilled.type
    });

    expect(state.user).toBeNull();
    expect(state.orders).toHaveLength(0);
  });

  it('updateUser.fulfilled — должен обновить данные пользователя', () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = userReducer({ ...initialState, user: mockUser }, action);

    expect(state.user?.name).toBe('Updated Name');
  });

  it('getOrders.pending — должен установить loading: true', () => {
    const state = userReducer(initialState, { type: getOrders.pending.type });
    expect(state.loading).toBe(true);
  });

  it('getOrders.fulfilled — должен записать заказы', () => {
    const action = { type: getOrders.fulfilled.type, payload: mockOrders };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('getOrders.rejected — должен записать ошибку', () => {
    const action = {
      type: getOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = userReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });

  it('clearError — должен очистить ошибку', () => {
    const stateWithError = { ...initialState, error: 'some error' };
    const state = userReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
