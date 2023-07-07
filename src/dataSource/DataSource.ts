import axios from 'axios';
import { Product } from './types';

export const getProductList = async (): Promise<Product[] | undefined> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response?.data;
};
