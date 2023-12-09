import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../res/fonts';
import sizes from '../res/sizes';
import colors from '../res/color';
interface Props {
  value?: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon: string;
  muntiline?: boolean;
  numberOfLines?: number;
  Err?: any;
  keyboardTypeNumber?: boolean;
}
export default function TextInputcustom(props: Props) {
  return (
    <View style={props.muntiline ? styles.btn3 : styles.btn2}>
      <Icon
        name={props.icon}
        color={colors.colorDargrey}
        size={25}
        style={{marginTop: props.muntiline ? 5 : 0}}
      />
      <TextInput
        value={props.value}
        onChangeText={(val: string) => {
          props.setValue(val);
          props.Err ? props.Err('') : null;
        }}
        keyboardType={props.keyboardTypeNumber ? 'numeric' : undefined}
        maxLength={props.keyboardTypeNumber ? 10 : undefined}
        placeholder={props.placeholder}
        style={props.muntiline ? styles.texinput1 : styles.text}
        multiline={props.muntiline}
        numberOfLines={props.numberOfLines}
        cursorColor={colors.colorText}
        selectionColor={colors.colorText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderRadius: 10,
    backgroundColor: colors.colorTxtIput,
    width: sizes._screen_width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._25sdp,
  },
  btn2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  btn3: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    marginTop: 15,
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-start',
    padding: 8,
    alignContent: 'flex-start',
  },
  text: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.044,
    width: sizes.width * 0.76,
  },
  texinput1: {
    width: sizes.width * 0.76,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
    textAlignVertical: 'top',
  },
});
