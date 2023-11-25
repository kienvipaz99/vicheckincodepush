import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import fonts from '../../../res/fonts';
import colors from '../../../res/color';
import {useDispatch} from 'react-redux';
import {image} from '../../../redux/state/image';
interface Props {
  checked?: boolean;
  navigation?: any;
}
export default function ButtomDang(props: Props) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={[styles.dang, {backgroundColor: props.checked ? '#1877f2' : '#ccd0d5'}]}
      onPress={() => {
        dispatch(image(''));
        props.navigation.goBack();
      }}>
      <Text style={[styles.txt1, {color: props.checked ? 'white' : colors.colorDargrey}]}>
        ĐĂNG
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  dang: {
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes._45sdp,
    width: 80,
    backgroundColor: '#1877f2',
    marginRight: 15,
    borderRadius: sizes._10sdp,
  },
  txt1: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.text,
  },
});
