import { Dispatch } from 'react';

import { getProductList } from '../../dataSource/DataSource';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ERROR = 'SET_ERROR';

export const getProductsRequest = () => {
  return async (dispatch: Dispatch<any>) => {
    return await getProductList()
      .then(response => {
        dispatch({ type: SET_PRODUCTS, payload: response });
        return response;
      })
      .catch(e => {
        dispatch({ type: SET_ERROR, payload: e.message });
      });
  };
};
