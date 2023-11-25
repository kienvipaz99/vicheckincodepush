import React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import images from '../res/images';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import TopTabBXH from '../container/TopTabBXH';
import {songaycuathang, thangnamhientai} from '../data/checkday';
import {useGetEmployeeReportQuery} from '../redux/api/auth.api';
import Loading from '../component/Loading';
const TimekeepingRating = () => {
  const {data, isSuccess, isLoading} = useGetEmployeeReportQuery('');
  return (
    <ImageBackground source={images.bgBXH1} style={styles.img}>
      <View style={styles.view}>
        <Text style={styles.txtHeader}>BẢNG XẾP HẠNG</Text>
        <Text style={styles.txt}>
          (01/{thangnamhientai()}-{songaycuathang()}/{thangnamhientai()})
        </Text>
        <View style={{marginTop: sizes._20sdp}}>
          <TopTabBXH data={data} isSuccess={isSuccess} />
        </View>
      </View>
      {isLoading && <Loading />}
    </ImageBackground>
  );
};

export default TimekeepingRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  txtHeader: {
    fontSize: sizes._font_size_max,

    color: 'white',
    fontFamily: fonts.textRegular,
  },
  txt: {
    color: 'white',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
  },
  view: {
    marginTop: sizes._50sdp,
    alignItems: 'center',
  },
});
