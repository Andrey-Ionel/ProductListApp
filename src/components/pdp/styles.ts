import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../styles/fonts';
import colors from '../../styles/colors';

const screenHeight = Dimensions.get('window').height;
const screen = Dimensions.get('screen').width;
export const styles = StyleSheet.create({
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
