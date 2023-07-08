import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../styles/fonts';

const screenHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    margin: 15,
    paddingBottom: 100,
  },
  errorIcon: {
    height: 12,
    width: 13,
    bottom: 2,
  },
  errorMessage: {
    fontFamily: fonts.gotham,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.5,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  borderRect: {
    borderRadius: 0,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 10,
    lineHeight: 17,
  },
  imageStyles: {
    height: 30,
    width: 30,
  },
});
