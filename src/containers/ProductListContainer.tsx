import { FC } from 'react';
import { connect } from 'react-redux';

import { ProductList } from '../components/ProductList';
import { getProductsRequest } from '../store/actions';

const mapStateToProps = (state: any) => {
  return {
    error: state.productsReducer.error as string,
  };
};

const mapDispatchToProps = {
  getProductsRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList as FC);
