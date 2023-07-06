import React, { FC, memo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ScreenWrapper } from './ScreenWrapper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { fonts } from '../styles/fonts';
import colors from '../styles/colors';
import { HIT_SLOP_AREA } from '../lib/constants';
import LinearGradient from 'react-native-linear-gradient';

export interface PDPProps {
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
const addItemText = 'Додати товар';

export const PDP: FC<PDPProps> = memo(() => {
  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper screenStyle={styles.screenContainer} needInSafeArea={true}>
        <TouchableOpacity style={styles.btn} hitSlop={HIT_SLOP_AREA}>
          <Text style={styles.btnText}>{addItemText}</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </LinearGradient>
  );
});
