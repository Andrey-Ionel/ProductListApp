import { Product } from '../dataSource/types';

export interface ReduxProductData {
  products: Product[];
  error: string;
}

export type CombinedPayload = Product[] | string | Product;
export interface ActionReducer {
  type: string;
  payload: any;
}
