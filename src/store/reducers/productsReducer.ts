import { SET_ERROR, SET_PRODUCTS } from '../actions';
import { ActionReducer, ReduxProductData } from '../types';
import { Product } from '../../dataSource/types';

const initialState: ReduxProductData = {
  products: [],
  error: '',
};

const productsReducer = (
  state: ReduxProductData = initialState,
  { type, payload }: ActionReducer,
) => {
  switch (type) {
    case SET_PRODUCTS:
      return { ...state, products: payload as Product[] };
    case SET_ERROR:
      return { ...state, error: payload as string };
    default:
      return state;
  }
};

export default productsReducer;
