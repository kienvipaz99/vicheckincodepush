import {Text, StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
interface Props {
  Textbtn: string;
  Opress: () => void;
  color?: string;
  loading?: boolean;
}
const ButonCustom = (props: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.Opress} style={styles.btn}>
        {props.loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={[styles.text, {color: props.color}]}>{props.Textbtn}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default ButonCustom;
const styles = StyleSheet.create({
  btn: {
    height: sizes._50sdp,
    width: sizes._screen_width * 0.6,
    backgroundColor: '#1b4a8a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes._55sdp,
  },
  text: {
    fontSize: sizes.width * 0.05,
    color: 'black',
    fontFamily: fonts.textBold,
  },
});
