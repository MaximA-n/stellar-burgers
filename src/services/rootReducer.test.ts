import store from './store';

describe('rootReducer', () => {
  it('должен правильно инициализировать начальное состояние всех слайсов', () => {
    const state = store.getState();

    expect(state.ingredients).toBeDefined();
    expect(state.ingredients.ingredients).toEqual([]);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBeNull();

    expect(state.burgerConstructor).toBeDefined();
    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients).toEqual([]);

    expect(state.order).toBeDefined();
    expect(state.order.order).toBeNull();
    expect(state.order.currentOrder).toBeNull();
    expect(state.order.orderRequest).toBe(false);

    expect(state.feed).toBeDefined();
    expect(state.feed.orders).toEqual([]);
    expect(state.feed.total).toBe(0);
    expect(state.feed.totalToday).toBe(0);

    expect(state.user).toBeDefined();
    expect(state.user.user).toBeNull();
    expect(state.user.isAuthChecked).toBe(false);
    expect(state.user.orders).toEqual([]);
  });

  it('должен обрабатывать неизвестные экшены без изменения состояния', () => {
    const stateBefore = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION_XYZ' });
    const stateAfter = store.getState();

    expect(stateAfter).toEqual(stateBefore);
  });
});
