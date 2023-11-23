import React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import colors from '../res/color';
import fonts from '../res/fonts';
import sizes from '../res/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface componentNameProps {
  value?: string;
  placeholder?: string;
  setValue: (val: string) => void;
  img?: number;
  type?: boolean;
  sdt?: boolean;
  seterr?: (val: string) => void;
  icon?: boolean;
  images?: boolean;
  onPressIcon?: () => void;
  editable?: boolean;
}
const TextInputCustoms = (props: componentNameProps) => {
  return (
    <View style={props.type ? styles.btn3 : styles.btn2}>
      {props.images ? null : (
        <Image source={props.img} style={props.type ? styles.icon1 : styles.icon} />
      )}
      <TextInput
        editable={props.editable}
        cursorColor={colors.colorText}
        selectionColor={colors.colorText}
        style={props.type ? styles.texinput1 : styles.texinput}
        placeholder={props.placeholder}
        value={props.value}
        maxLength={props.sdt ? 10 : undefined}
        keyboardType={props.sdt ? 'numeric' : 'default'}
        multiline={props.type}
        numberOfLines={props.type ? 5 : undefined}
        onChangeText={(val: string) => {
          props.setValue(val);
          props.seterr && props.seterr('');
        }}
      />
      {props.icon && (
        <MaterialIcons
          style={props.type && {marginTop: 10}}
          name="cancel"
          color={'black'}
          size={25}
          onPress={props.onPressIcon}
        />
      )}
    </View>
  );
};

export default TextInputCustoms;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  btn2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  texinput1: {
    width: '90%',
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
    height: 150,
    textAlignVertical: 'top',
  },
  icon: {
    marginRight: 8,
    height: 25,
    width: 25,
    tintColor: '#959595',
    marginLeft: sizes._10sdp,
  },
  icon1: {
    marginRight: 8,
    height: 25,
    width: 25,
    tintColor: '#959595',
    resizeMode: 'cover',
  },
  texinput: {
    width: '90%',
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
  },
});
