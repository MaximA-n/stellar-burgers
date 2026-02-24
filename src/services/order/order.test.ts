import { TOrder } from '@utils-types';
import orderReducer, { clearOrder, initialState } from './slice';
import { createOrder, getOrderByNumber } from './actions';

const mockOrder: TOrder = {
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
};

describe('order slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('createOrder.pending — должен установить orderRequest: true', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled — должен записать заказ и сбросить orderRequest', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { success: true, order: mockOrder, name: 'Краторный бургер' }
    };
    const state = orderReducer({ ...initialState, orderRequest: true }, action);

    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('createOrder.rejected — должен установить ошибку и сбросить orderRequest', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = orderReducer({ ...initialState, orderRequest: true }, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('getOrderByNumber.fulfilled — должен записать currentOrder', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = orderReducer(initialState, action);

    expect(state.currentOrder).toEqual(mockOrder);
  });

  it('getOrderByNumber.rejected — должен записать ошибку', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Заказ не найден' }
    };
    const state = orderReducer(initialState, action);

    expect(state.error).toBe('Заказ не найден');
  });

  it('clearOrder — должен очистить order и error', () => {
    const stateWithOrder = {
      ...initialState,
      order: mockOrder,
      error: 'some error'
    };
    const state = orderReducer(stateWithOrder, clearOrder());

    expect(state.order).toBeNull();
    expect(state.error).toBeNull();
  });
});
