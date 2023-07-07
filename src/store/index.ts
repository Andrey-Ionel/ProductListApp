import { createStore, combineReducers, applyMiddleware } from 'redux';
import productsReducer from './reducers/productsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ productsReducer });
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
