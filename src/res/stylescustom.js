import {StyleSheet} from 'react-native';
import colors from './color';
import fonts from './fonts';
import sizes from './sizes';
export default stylescustom = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: sizes._20sdp,
    width: sizes._screen_width,
    backgroundColor: colors.colorWhite,
    alignItems: 'center',
  },
  container: {
    flex: 1,

    backgroundColor: colors.colorWhite,
  },
  contentContainer1: {
    flex: 1,
    marginTop: sizes._20sdp,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  err: {
    color: 'red',
    fontSize: sizes._screen_width * 0.03,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: sizes._15sdp,
  },
  imgStar: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadowitem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textName: {
    color: colors.colorText,
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_big_big_large,
  },
  textEmail: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
  },
  txt: {
    color: colors.colorblack,
    fontSize: sizes._screen_width * 0.04,
    fontFamily: fonts.textRegular,
  },
  txtBold: {
    color: colors.colorblack,
    fontSize: sizes._screen_width * 0.04,
    fontFamily: fonts.textBold,
  },
});
