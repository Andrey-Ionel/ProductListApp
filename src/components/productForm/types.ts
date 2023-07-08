import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Product } from '../../dataSource/types';
export interface ProductFormProps {
  addProductRequest: (
    title: string,
    price: string,
    description: string,
  ) => Promise<void>;
  updateProductsRequest: (products: Product[]) => Promise<void>;
  products: Product[];
  error: string;
  navigation: NavigationProp<ParamListBase>;
}

export interface ProductFormFields {
  title: string;
  price: string;
  description: string;
}

export interface FormFields {
  formFieldName: string;
  required: boolean;
  title: string;
}
