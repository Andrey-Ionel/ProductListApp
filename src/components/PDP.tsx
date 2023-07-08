import React, { FC, memo } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';

import { ScreenWrapper } from './ScreenWrapper';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-fast-image';

import { Product } from '../dataSource/types';

import { fonts } from '../styles/fonts';
import colors from '../styles/colors';

export interface PDPProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { item: Product } }, 'params'>;
}

const screenHeight = Dimensions.get('window').height;
const screen = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    margin: 15,
    paddingBottom: 100,
  },
  btn: {
    borderRadius: 0,
    backgroundColor: colors.backgroundPrimary,
    padding: 15,
    lineHeight: 22,
    fontSize: 18,
    marginBottom: 30,
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
  rowContainer: {
    flexDirection: 'row',
  },
  itemContent: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.ghotamBlack,
    marginHorizontal: 10,
    color: colors.textPrimary,
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  price: {
    fontSize: 25,
    fontFamily: fonts.bebasNeue,
    marginHorizontal: 10,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  productImageStyle: {
    width: '100%',
    height: screen,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 18,
    fontFamily: fonts.gotham,
    marginHorizontal: 10,
    color: colors.textPrimary,
    marginTop: 15,
  },
});

export const PDP: FC<PDPProps> = memo(props => {
  const item = props?.route?.params?.item;
  if (!item?.title || !item?.image) {
    return null;
  }

  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        needInSafeArea={true}
        scroll={true}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.price}>{`${item?.price} $`}</Text>
          <Image
            style={styles.productImageStyle}
            source={{ uri: item?.image }}
          />
          <Text style={styles.description}>{item?.description}</Text>
        </View>
      </ScreenWrapper>
    </LinearGradient>
  );
});
