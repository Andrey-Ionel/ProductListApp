import axios from 'axios';
import { Product } from './types';

export const getProductList = async (): Promise<Product[] | undefined> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response?.data;
};

export const addProduct = async (
  title: string,
  price: string,
  description: string,
): Promise<Product | undefined> => {
  const defaultCategory = 'other';
  const defaultImage =
    'https://st.depositphotos.com/2673929/54606/i/450/depositphotos_546065288-stock-photo-smartphone-gold-cart-different-packages.jpg';
  const response = await axios.post('https://fakestoreapi.com/products', {
    title,
    price,
    description,
    image: defaultImage,
    category: defaultCategory,
  });
  return response?.data;
};
