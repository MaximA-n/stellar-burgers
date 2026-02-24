import { TOrder } from '@utils-types';
import feedReducer, { initialState } from './slice';
import { getFeeds } from './actions';

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

describe('feed slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('getFeeds.pending — должен установить loading: true', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getFeeds.fulfilled — должен записать заказы, total, totalToday и установить loading: false', () => {
    const payload = {
      orders: mockOrders,
      total: 100,
      totalToday: 5,
      success: true
    };
    const action = { type: getFeeds.fulfilled.type, payload };
    const state = feedReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(5);
    expect(state.error).toBeNull();
  });

  it('getFeeds.rejected — должен записать ошибку и установить loading: false', () => {
    const errorMessage = 'Ошибка загрузки ленты';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toHaveLength(0);
  });
});
