import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { Product } from '../../dataSource/types';
export interface PDPProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { item: Product } }, 'params'>;
}
