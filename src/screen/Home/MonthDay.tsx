import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import images from '../../res/images';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import {useGetEmployeeReportQuery} from '../../redux/api/auth.api';
import stylescustom from '../../res/stylescustom';
export default function MonthDay({
  navigation,
  id,
}: {
  navigation: NavigationProp<Record<string, any>>;
  id: number;
}) {
  const {data} = useGetEmployeeReportQuery('');

  const datas = data?.data?.filter((item: ReportEmployee) => item?.id === id) as ReportEmployee[];

  return (
    <Pressable
      onPress={() => navigation.navigate('BaoCaoChamCong')}
      style={stylescustom.shadowitem}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#4096e5', '#55b9f9']}
        style={styles.item4}>
        <View style={styles.item5}>
          <Image source={images.conthangnay} style={styles.img} />
        </View>
        <Text style={styles.text1}>Công tháng này</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text3}>{datas ? datas[0]?.work : '--:--'}</Text>

          <Text style={styles.text2}>{datas ? datas[0]?.in_time_late : '--:--'} phút đi muộn </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: 'white',
    fontFamily: fonts.textBold,
    fontSize: sizes._screen_width * 0.04,
  },
  text2: {
    color: 'white',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_large,
  },
  text3: {
    color: 'white',
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_big,
  },
  item4: {
    width: sizes._screen_width * 0.35,
    height: sizes._160sdp,
    borderRadius: 20,
    right: sizes._screen_width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    ...stylescustom.shadowitem,
  },
  item5: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  img: {height: 28, width: 28, alignSelf: 'center'},
});
