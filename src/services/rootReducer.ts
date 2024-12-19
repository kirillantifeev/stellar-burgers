import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import authReducer from '../slices/authSlice';
import feedsSliceReducer from '../slices/feedSlice';
import orderReducer from '../slices/orderSlice';
import ordersReducer from '../slices/userOrders';
import getOrderReducer from '../slices/getOrderByNumber';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feeds: feedsSliceReducer,
  order: orderReducer,
  orders: ordersReducer,
  getOrder: getOrderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
