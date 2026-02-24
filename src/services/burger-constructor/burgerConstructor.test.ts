import { TIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  clearConstructor,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from './slice';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockMain2: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

describe('burgerConstructor slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  describe('addIngredient', () => {
    it('должен добавлять булку в state.bun', () => {
      const action = addIngredient(mockBun);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.bun).not.toBeNull();
      expect(state.bun?._id).toBe('643d69a5c3f7b9001cfa093c');
      expect(state.bun?.name).toBe('Краторная булка N-200i');
      expect(state.bun?.id).toBeDefined();
    });

    it('должен заменять старую булку новой', () => {
      const bunState = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );
      const anotherBun: TIngredient = {
        ...mockBun,
        _id: 'bun-2',
        name: 'Флюоресцентная булка R2-D3'
      };

      const newState = burgerConstructorReducer(
        bunState,
        addIngredient(anotherBun)
      );

      expect(newState.bun?._id).toBe('bun-2');
    });

    it('должен добавлять начинку в state.ingredients', () => {
      const action = addIngredient(mockMain);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
      expect(state.ingredients[0].id).toBeDefined();
    });

    it('должен добавлять несколько начинок', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      expect(state.ingredients).toHaveLength(2);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по id', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      const addedId = state.ingredients[0].id;

      state = burgerConstructorReducer(state, removeIngredient(addedId));

      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалять другие ингредиенты', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      const idToRemove = state.ingredients[0].id;
      state = burgerConstructorReducer(state, removeIngredient(idToRemove));

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0943');
    });
  });

  describe('moveIngredientUp', () => {
    it('должен поднимать ингредиент на одну позицию вверх', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      state = burgerConstructorReducer(state, moveIngredientUp(1));

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0943');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0941');
    });

    it('не должен изменять порядок при перемещении первого элемента вверх', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      state = burgerConstructorReducer(state, moveIngredientUp(0));

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0943');
    });
  });

  describe('moveIngredientDown', () => {
    it('должен опускать ингредиент на одну позицию вниз', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      state = burgerConstructorReducer(state, moveIngredientDown(0));

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0943');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0941');
    });

    it('не должен изменять порядок при перемещении последнего элемента вниз', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain2));

      state = burgerConstructorReducer(state, moveIngredientDown(1));

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0943');
    });
  });

  describe('clearConstructor', () => {
    it('должен очищать конструктор полностью', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );
      state = burgerConstructorReducer(state, addIngredient(mockMain));

      state = burgerConstructorReducer(state, clearConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
