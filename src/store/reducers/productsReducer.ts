import { createSlice } from '@reduxjs/toolkit';
import { ReduxProductData } from '../types';
import { Product } from '../../dataSource/types';

const initialState: ReduxProductData = {
  products: [],
  error: '',
};

const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts(state, { payload }) {
      state.products = payload as Product[];
    },
    addNewProduct(state, { payload }) {
      state.products = [payload as Product, ...state.products];
    },
    updateProduct(state, { payload }) {
      state.products = payload as Product[];
    },
    getError(state, { payload }) {
      state.error = payload as string;
    },
  },
});

export const { getProducts, addNewProduct, updateProduct, getError } =
  productsReducer.actions;
export default productsReducer.reducer;
