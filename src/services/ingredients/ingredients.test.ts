import { TIngredient } from '@utils-types';
import ingredientsReducer, { initialState } from '../ingredients/slice';
import { getIngredients } from '../ingredients/actions';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredients slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('getIngredients.pending — должен установить loading: true', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getIngredients.fulfilled — должен записать ингредиенты и установить loading: false', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('getIngredients.rejected — должен записать ошибку и установить loading: false', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toHaveLength(0);
  });
});
