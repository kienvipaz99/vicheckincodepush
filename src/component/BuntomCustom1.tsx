import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import sizes from '../res/sizes';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../res/fonts';
import colors from '../res/color';
import {ActivityIndicator} from 'react-native';
interface Props {
  text: string;
  onpress: () => void;
  isLoading?: boolean;
}
export default function BuntomCustom1(props: Props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0}}
      colors={['#11449c', '#055fc5']}
      style={styles.linear}>
      <TouchableOpacity style={styles.btn} onPress={props.onpress}>
        {props.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.txt}>{props.text}</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  linear: {
    height: sizes._50sdp,
    width: '100%',
    borderRadius: sizes._12sdp,
  },
  txt: {
    color: colors.colorWhite,
    fontSize: sizes._font_size_max_max,
    fontFamily: fonts.textRegular,
  },
});
