import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';

const rootReducer = combineReducers({ productsReducer });
export default configureStore({ reducer: rootReducer });
