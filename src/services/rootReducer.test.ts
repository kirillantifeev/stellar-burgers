import { rootReducer } from './rootReducer';
import { RootState } from './rootReducer';

describe('rootReducer', () => {
  const initialState: RootState = {
    ingredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    auth: {
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null
    },
    feeds: {
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: false,
      error: null
    },
    order: {
      order: null,
      isLoading: false,
      error: null
    },
    orders: {
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false
      },
      loading: false,
      error: null
    },
    getOrder: {
      order: null,
      isLoading: false,
      error: null
    }
  };

  test('should return the initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
