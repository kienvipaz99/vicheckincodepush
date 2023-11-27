import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';

interface DanhSachThamGiaProps {
  item: any;
  index: number;
}

const DanhSachThamGia = (props: DanhSachThamGiaProps) => {
  return (
    <View style={styles.item} key={props.index}>
      <View style={styles.item2} />
      <Text style={styles.txt}>{props.item.name}</Text>
    </View>
  );
};

export default DanhSachThamGia;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: sizes._screen_width / 1.8,
    alignItems: 'center',
  },
  item2: {
    backgroundColor: 'black',
    height: 5,
    width: 5,
    borderRadius: 30,
  },
  txt: {
    color: colors.colorText,
    marginLeft: sizes._10sdp,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
});
