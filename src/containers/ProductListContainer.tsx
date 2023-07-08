import { FC } from 'react';
import { connect } from 'react-redux';

import { ProductList } from '../components/productList';
import { getProductsRequest, updateProductsRequest } from '../store/actions';
import { Product } from '../dataSource/types';

const mapStateToProps = (state: any) => {
  return {
    products: state.productsReducer.products as Product[],
    error: state.productsReducer.error as string,
  };
};

const mapDispatchToProps = {
  getProductsRequest,
  updateProductsRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList as FC);
