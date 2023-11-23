import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import fonts from '../../res/fonts';

import stylescustom from '../../res/stylescustom';
interface Props {
  numberday: number;
  ngaycong?: number;
  dimuon?: number;
  leaves?: Leaves[];
}
export default function RenderNgayCong(props: Props) {
  return (
    <View>
      <View style={[styles.item2, stylescustom.shadowitem]}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text1}>Ngày công</Text>
          <Text style={styles.text}>
            {(props.ngaycong ? props?.ngaycong : '') + '/' + props.numberday}
          </Text>
        </View>
        <View style={styles.gach} />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text1}>Nghỉ không công</Text>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.gach} />

        <View style={{alignItems: 'center'}}>
          <Text style={styles.text1}>Nghỉ làm</Text>
          <Text style={styles.text}>1</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.item3}>
          <Text style={styles.txt}>Số ngày phép còn lại:</Text>
          <Text style={styles.txt2}>{props?.leaves ? props?.leaves[0]?.amount : 0}</Text>
        </View>
        <View style={styles.item3}>
          <Text style={styles.txt}>Tổng số phút đi muộn:</Text>
          <Text style={styles.txt2}>{props?.dimuon + ' phút'}</Text>
        </View>

        {/* <View style={styles.item3}>
          <Text style={styles.txt}>Nghỉ không lý do:</Text>
          <Text style={styles.txt2}>123</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',

    height: sizes._110sdp,
  },
  text1: {
    fontSize: sizes._font_size_big_big_large,
    color: 'black',
    fontFamily: fonts.textRegular,
    top: -10,
  },
  text: {
    fontSize: sizes._font_size_max,
    color: '#1352ae',
    fontFamily: fonts.textBold,
  },
  gach: {height: 35, width: 2, backgroundColor: '#e8e9ec9e', bottom: -10},
  item: {
    width: '100%',

    alignItems: 'center',
    marginTop: sizes._20sdp,
  },
  item3: {
    width: '90%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,

    width: '80%',
  },
  txt2: {
    color: colors.colorText,
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_big,
    marginRight: 15,
  },
});
