import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../../res/images';
import stylescustom from '../../res/stylescustom';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import {convert} from '../../res/validate';
interface Props {
  item?: any;
}
export default function DanhSach(props: Props) {
  return (
    <TouchableOpacity style={[styles.container, stylescustom.shadowitem]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.txt}>{props.item.title}</Text>

        <Text style={styles.txt1}>{props.item.timestart}</Text>
      </View>
      <Text style={styles.txt1}>{props.item.mota}</Text>
      <View style={stylescustom.row1}>
        <Text style={styles.txt1}>Phần thưởng: {convert(props.item.phanthuong)}</Text>
        <Image source={images.star} style={stylescustom.imgStar} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width * 0.9,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: sizes._10sdp,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: sizes._10sdp,
  },
  txt: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
    width: '75%',
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
  },
});
