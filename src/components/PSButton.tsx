import React, { FC } from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HIT_SLOP_AREA } from '../lib/constants';
import colors from '../styles/colors';
import { fonts } from '../styles/fonts';

const styles = StyleSheet.create({
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
});

interface PSButtonProps {
  title: string;
  addProduct: () => void;
  disabled?: boolean;
}

export const PSButton: FC<PSButtonProps> = ({
  addProduct,
  title,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={addProduct}
      disabled={disabled}
      style={styles.btn}
      hitSlop={HIT_SLOP_AREA}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};
