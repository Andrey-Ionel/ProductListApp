import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const logError = (error: any) => console.log(error);

export const HIT_SLOP_AREA = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export const CONTAINS_ONLY_DIGITS_REGEX = /^[0-9.,]+$/;
