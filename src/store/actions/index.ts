import { Dispatch } from 'react';

import { addProduct, getProductList } from '../../dataSource/DataSource';
import {
  addNewProduct,
  getError,
  getProducts,
  updateProduct,
} from '../reducers/productsReducer';
import { Product } from '../../dataSource/types';

export const getProductsRequest = () => {
  return async (dispatch: Dispatch<any>) => {
    await getProductList()
      .then(response => {
        dispatch(getProducts(response));
      })
      .catch(e => {
        dispatch(getError(e.message));
      });
  };
};

export const addProductRequest = (
  title: string,
  price: string,
  description: string,
) => {
  return async (dispatch: Dispatch<any>) => {
    await addProduct(title, price, description)
      .then(response => {
        dispatch(addNewProduct(response));
      })
      .catch(e => {
        dispatch(getError(e.message));
      });
  };
};

export const updateProductsRequest = (products: Product[]) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(updateProduct(products));
  };
};
