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

import { Product } from '../dataSource/types';

import { fonts } from '../styles/fonts';
import colors from '../styles/colors';
import { HIT_SLOP_AREA, logError } from '../lib/constants';

export interface ProductListProps {
  navigation: NavigationProp<ParamListBase>;
  products: Product[];
  error: string;
  getProductsRequest: () => Promise<Product[]>;
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    paddingBottom: 30,
  },
  btn: {
    borderRadius: 0,
    backgroundColor: colors.backgroundPrimary,
    padding: 15,
    lineHeight: 22,
    fontSize: 18,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 18,
    fontFamily: fonts.ghotamBlack,
    textAlign: 'center',
    color: colors.textSecondary,
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
});

const productListText = 'Product List';
const addItemText = 'Add Product';

export const ProductList: FC<ProductListProps> = memo(
  ({ navigation, getProductsRequest, error }) => {
    const [productData, setProductData] = useState<Product[]>();
    const [loading, setLoading] = useState(false);

    const saveProducts = async () => {
      setLoading(true);
      await getStorageValue(AsyncStorageKeys.productsData).then(
        async storageData => {
          if (storageData?.length && storageData?.length > 2) {
            setProductData(JSON.parse(storageData));
            setLoading(false);
          } else {
            const queryProducts: Product[] = await getProductsRequest();
            if (queryProducts?.length) {
              setProductData(queryProducts);
              await setStorageValue(
                AsyncStorageKeys.productsData,
                queryProducts,
              ).catch(e => logError(e));
            }
            setLoading(false);
          }
        },
      );
    };

    useEffect(() => {
      saveProducts().catch(e => logError(e));
    }, []);

    const goToPDP = (item: Product) => () => {
      navigation.navigate('PDP', { item });
    };

    const addProduct = async () => {};

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
      return (
        <TouchableOpacity
          onPress={addProduct}
          style={styles.btn}
          hitSlop={HIT_SLOP_AREA}>
          <Text style={styles.btnText}>{addItemText}</Text>
        </TouchableOpacity>
      );
    };

    const renderHeader = () => {
      return <Header title={productListText} />;
    };

    const renderSeparator = () => {
      return <View style={styles.separator} />;
    };

    if (error.length) {
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
            data={productData}
            renderItem={({ item }) => renderItem(item)}
            ItemSeparatorComponent={renderSeparator}
          />
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
