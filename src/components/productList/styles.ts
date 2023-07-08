import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const screenHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
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
