import React, { FC, memo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Header } from './Header';
import { ScreenWrapper } from './ScreenWrapper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { fonts } from '../styles/fonts';
import colors from '../styles/colors';
import { HIT_SLOP_AREA } from '../lib/constants';
import LinearGradient from 'react-native-linear-gradient';

export interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    paddingBottom: 40,
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
});

const productListText = 'Список товарів';
const addItemText = 'Додати товар';

export const Home: FC<HomeProps> = memo(({ navigation }) => {
  const addProduct = async () => {
    navigation.navigate('PDP');
  };

  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        needInSafeArea={true}
        fixedComponentTop={<Header title={productListText} />}>
        <TouchableOpacity
          onPress={addProduct}
          style={styles.btn}
          hitSlop={HIT_SLOP_AREA}>
          <Text style={styles.btnText}>{addItemText}</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </LinearGradient>
  );
});
