import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../res/images';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import {NavigationProp} from '@react-navigation/native';
import {useGetemployee_attendanceQuery} from '../../redux/api/auth.api';
import {HouseMinute} from '../../res/convert';
import stylescustom from '../../res/stylescustom';
export default function Today({navigation}: {navigation: NavigationProp<Record<string, any>>}) {
  const {data} = useGetemployee_attendanceQuery('', {
    pollingInterval: 10000,
  });

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('TodayAttendance', {
          id: data?.working_shift?.id,
        })
      }
      style={stylescustom.shadowitem}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#66db82', '#41c78c']}
        style={styles.item2}>
        <View style={styles.item3}>
          <Image source={images.homnay} style={{height: 26, width: 26, alignSelf: 'center'}} />
        </View>
        <Text style={styles.text1}>Hôm nay</Text>
        <View>
          <Text style={styles.text2}>
            Check in: {data ? HouseMinute(data?.details[0]?.in_time) : '--:--'}
          </Text>
          <Text style={styles.text2}>
            Check out: {data ? HouseMinute(data?.details[0]?.out_time) : '--:--'}
          </Text>
          <Text style={styles.text2}>Công: {data ? data?.details[0]?.works : 0}</Text>
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
  item2: {
    width: sizes._screen_width * 0.35,
    height: sizes._160sdp,
    borderRadius: 20,
    elevation: 5,
    left: sizes._screen_width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item3: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
});
