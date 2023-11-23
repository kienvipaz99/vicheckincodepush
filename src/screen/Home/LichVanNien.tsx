import * as React from 'react';
import {PanResponder, StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LunarDate, SolarDate} from 'vietnamese-lunar-calendar';
import GetTimes from '../../component/GetTims';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import images from '../../res/images';

interface LichVanNienProps {}
const LichVanNien = (props: LichVanNienProps) => {
  const [amlich, setAmLich] = React.useState(new LunarDate(new Date()));
  const [duonglich, setDuongLich] = React.useState(new SolarDate(new Date()));
  const [swipeDetected, setSwipeDetected] = React.useState(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx > 0 && !swipeDetected) {
          setSwipeDetected(true);
        }
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  return (
    <ImageBackground
      style={{height: sizes._screen_height, width: sizes._screen_width}}
      source={images.bglich}>
      <SafeAreaView>
        {/* <Image source={image[imageIndex]} style={{flex: 1}} /> */}
        <View {...panResponder.panHandlers}>
          <View style={{marginTop: sizes._20sdp, alignItems: 'center'}}>
            <Text style={styles.txt}>THÁNG {duonglich.month}</Text>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: sizes._screen_width * 0.15,
              fontFamily: fonts.textBold,
              fontSize: sizes._100sdp,
              color: duonglich.weekDay ? '#ED214A' : '#3B3BEB',
            }}>
            {duonglich.date}
          </Text>
          <Text
            style={{
              ...styles.view,
              color: duonglich.weekDay ? '#ED214A' : '#3B3BEB',
            }}>
            {duonglich.weekDay}
          </Text>
          <View style={styles.cadao}>
            <Text style={styles.txt3}>
              {duonglich.holiday
                ? duonglich.holiday
                : amlich.holiday
                ? amlich.holiday
                : 'Về cơ bản con người là tốt'}
            </Text>
          </View>
          <View style={[stylescustom.row2, {marginTop: 20}]}>
            <LinearGradient
              start={{x: 0.2, y: 0}}
              end={{x: 0, y: 1.5}}
              colors={['#F23D3D', '#C4ADAD']}>
              <View style={styles.txt4}>
                <Text style={styles.txt6}>Tháng {amlich.month}</Text>
              </View>
            </LinearGradient>

            <LinearGradient start={{x: 0, y: 0}} end={{x: 2, y: 0}} colors={['#336AD6', '#C4ADAD']}>
              <View style={styles.txt5}>
                <GetTimes />
              </View>
            </LinearGradient>
          </View>
          <View style={stylescustom.row2}>
            <View style={{width: sizes._screen_width * 0.45, alignItems: 'center'}}>
              <Text style={styles.txt2}>{amlich.date}</Text>
              <Text style={styles.txt1}>Năm {amlich.getLunarYear()}</Text>
            </View>
            <View
              style={{
                width: sizes._screen_width * 0.45,
                top: 20,
                marginBottom: 10,
              }}>
              <Text style={styles.txt7}>Ngày {amlich.getLunarDate()}</Text>
              <Text style={styles.txt7}>Tháng {amlich.getLunarMonth()}</Text>
              <Text style={styles.txt7}>Năm {amlich.getLunarYear()}</Text>
              <Text style={styles.txt7}>Tiết: {amlich.solarTerm}</Text>
              <Text style={styles.txt7}>Giờ hoàng đạo</Text>
              <Text style={[styles.txt7]}>{amlich.luckyHours}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LichVanNien;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cadao: {
    alignSelf: 'center',
    marginTop: sizes._screen_width * 0.1,
    alignItems: 'center',
    width: '80%',
  },
  txt1: {
    marginTop: sizes._screen_width * 0.08,
    fontFamily: fonts.textBold,
    fontSize: sizes._20sdp,
    color: '#C21336',
  },
  txt2: {
    marginTop: sizes._screen_width * 0.08,
    fontFamily: fonts.textBold,
    fontSize: sizes._80sdp,
    color: '#C21336',
  },
  txt: {
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    color: '#3B3BEB',
  },
  txt3: {
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
    color: colors.colorText,
  },
  txt4: {
    width: sizes._screen_width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  txt5: {
    width: sizes._screen_width * 0.45,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt6: {
    color: 'white',
    fontSize: sizes._font_size_maxs,
    fontFamily: fonts.textRegular,
  },
  txt7: {
    color: '#CC0000',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
    textAlign: 'center',
  },
  view: {
    alignSelf: 'center',
    marginTop: sizes._screen_width * 0.1,
    fontFamily: fonts.textBold,
    fontSize: sizes._30sdp,
  },
});
