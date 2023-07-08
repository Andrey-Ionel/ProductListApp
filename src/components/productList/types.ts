import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Product } from '../../dataSource/types';
export interface ProductListProps {
  navigation: NavigationProp<ParamListBase>;
  products: Product[];
  error: string;
  getProductsRequest: () => Promise<void>;
  updateProductsRequest: (products: Product[]) => Promise<void>;
}
