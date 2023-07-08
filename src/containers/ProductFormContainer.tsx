import { ProductForm } from '../components/productForm';
import { addProductRequest, updateProductsRequest } from '../store/actions';
import { Product } from '../dataSource/types';
import { connect } from 'react-redux';
import { FC } from 'react';

const mapStateToProps = (state: any) => {
  return {
    products: state.productsReducer.products as Product[],
    error: state.productsReducer.error as string,
  };
};

const mapDispatchToProps = {
  addProductRequest,
  updateProductsRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm as FC);
