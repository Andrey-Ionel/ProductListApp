import React, { FC, memo, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  FlatListProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Header } from './Header';
import { Loading } from './Loading';
import { ScreenWrapper } from './ScreenWrapper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AsyncStorageKeys,
  getStorageValue,
  setStorageValue,
} from '../lib/asyncStorage';
import Image from 'react-native-fast-image';
import { logError } from '../lib/constants';
import { PSButton } from './PSButton';

import { Product } from '../dataSource/types';

import { fonts } from '../styles/fonts';
import colors from '../styles/colors';

export interface ProductListProps {
  navigation: NavigationProp<ParamListBase>;
  products: Product[];
  error: string;
  getProductsRequest: () => Promise<void>;
  updateProductsRequest: (products: Product[]) => Promise<void>;
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    paddingBottom: 30,
  },
  listData: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 15,
  },
  separator: {
    borderBottomColor: colors.separatorPrimary,
    borderBottomWidth: 0.4,
    marginVertical: 30,
  },
  productImageStyle: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  itemContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.ghotamBlack,
    marginHorizontal: 10,
    color: colors.textPrimary,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    fontFamily: fonts.bebasNeue,
    marginHorizontal: 10,
    color: colors.textPrimary,
  },
  noResult: {
    fontFamily: fonts.gotham,
    fontSize: 18,
    letterSpacing: 1,
    paddingVertical: 5,
    marginLeft: 40,
  },
});

const productListText = 'Product List';
const addItemText = 'Add Product';

export const ProductList: FC<ProductListProps> = memo(
  ({
    navigation,
    getProductsRequest,
    updateProductsRequest,
    error,
    products,
  }) => {
    const [loading, setLoading] = useState(false);

    const setProducts = async () => {
      try {
        setLoading(true);
        await getStorageValue(AsyncStorageKeys.productsData).then(
          async storageData => {
            if (storageData?.length && storageData?.length > 2) {
              const parseStorageData = JSON.parse(storageData);
              updateProductsRequest(parseStorageData);
              setLoading(false);
            } else {
              await getProductsRequest().then(async () => {
                await setStorageValue(
                  AsyncStorageKeys.productsData,
                  products,
                ).catch(e => logError(e));
              });
              setLoading(false);
            }
          },
        );
      } catch (e) {
        setLoading(false);
      }
    };

    useEffect(() => {
      setProducts().catch(e => logError(e));
    }, []);

    const goToPDP = (item: Product) => () => {
      navigation.navigate('PDP', { item });
    };

    const addProduct = async () => {
      navigation.navigate('AddProductsForm');
    };

    const keyExtractor: FlatListProps<Product>['keyExtractor'] = (item, i) =>
      item + i.toString();

    const renderItem = (item: Product) => {
      return (
        <TouchableOpacity style={styles.rowContainer} onPress={goToPDP(item)}>
          <Image
            style={styles.productImageStyle}
            source={{ uri: item.image }}
          />
          <View style={styles.itemContent}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.price}>{`${item?.price} $`}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    const renderButton = () => {
      return <PSButton title={addItemText} addProduct={addProduct} />;
    };

    const renderHeader = () => {
      return <Header title={productListText} />;
    };

    const renderSeparator = () => {
      return <View style={styles.separator} />;
    };

    const renderNoProducts = () => {
      const noResultText = 'There are no products for you at the moment.';
      return (
        <View>
          <Text style={styles.noResult}>{noResultText}</Text>
        </View>
      );
    };

    if (error?.length) {
      Alert.alert(
        'Something went wrong while trying to get products.',
        `"${error}"`,
      );
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <LinearGradient colors={colors.systemBackgroundGradient}>
        <ScreenWrapper
          screenStyle={styles.screenContainer}
          needInSafeArea={true}
          fixedComponentTop={renderHeader()}
          fixedComponentBottom={renderButton()}>
          <FlatList
            keyExtractor={keyExtractor}
            style={styles.listData}
            data={products}
            renderItem={({ item }) => renderItem(item)}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderNoProducts()}
          />
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
