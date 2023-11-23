import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
interface Props {
  name: any;
  img: any;
  navigation?: any;
  navigate: any;
}

const RenderitemQuanLy = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => props.navigation.navigate(props.navigate)}>
      <Image source={props.img} style={{height: sizes._50sdp, width: sizes._50sdp}} />
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
};
export default RenderitemQuanLy;

const styles = StyleSheet.create({
  container: {
    height: sizes._100sdp,
    width: (sizes._screen_width * 0.9) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    ...stylescustom.shadowitem,
  },
  text: {
    color: colors.colorblack,
    fontSize: sizes._screen_width * 0.036,
    fontFamily: fonts.textRegular,
    marginTop: 10,
  },
});
