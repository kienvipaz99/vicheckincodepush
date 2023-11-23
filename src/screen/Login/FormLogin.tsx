import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import images from '../../res/images';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FormLogin({
  user,
  pass,
  errpass,
  setUser,
  setPass,
}: {
  user?: string;
  pass: string;
  errpass: string;
  setUser: (val: string) => void;
  setPass: (val: string) => void;
}) {
  const [show, setShow] = React.useState(true);
  const checkpass = () => {
    setShow(!show);
  };
  return (
    <View style={styles.viewinput}>
      <View style={styles.view}>
        <Image source={images.iconuser} style={styles.img} />
        <TextInput
          placeholder="Tên đăng nhập"
          value={user}
          onChangeText={setUser}
          style={styles.iputuser}
        />
      </View>
      <View style={styles.view}>
        <View style={styles.txtinput}>
          <Image source={images.lock} style={styles.img} />
          <TextInput
            secureTextEntry={show}
            placeholder="Mật khẩu"
            value={pass}
            onChangeText={setPass}
            style={styles.input}
          />
        </View>

        {show === true ? (
          <Icon
            name="eye-slash"
            color={'#bcbdbe'}
            size={20}
            onPress={checkpass}
            style={{marginRight: 10}}
          />
        ) : (
          <Icon
            name="eye"
            color={'#bcbdbe'}
            size={20}
            onPress={checkpass}
            style={{marginRight: 10}}
          />
        )}
      </View>
      {errpass && <Text style={styles.err}>{errpass}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  viewinput: {
    marginTop: sizes._csreen_height * 0.37,

    alignItems: 'center',
    justifyContent: 'center',
  },

  chekbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._15sdp,
    width: sizes._screen_width * 0.72,
  },
  view: {
    width: sizes._screen_width * 0.85,
    height: 45,
    backgroundColor: '#DCDCD',
    borderRadius: 60,
    borderColor: '#bcbdbe',
    borderWidth: 1,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 18,
    width: 14,
    marginLeft: sizes._15sdp,
  },
  input: {
    marginLeft: sizes._10sdp,
    fontFamily: fonts.textRegular,
    width: '90%',
    height: '100%',
    color: colors.colorText,
  },
  txt: {
    color: '#bcbdbe',
    marginLeft: 10,
    fontFamily: fonts.textitalic,
  },
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    width: '80%',
    marginLeft: sizes._20sdp,
  },
  txtinput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: sizes._screen_width * 0.75,
  },
  iputuser: {
    color: colors.colorText,

    fontFamily: fonts.textRegular,
    width: sizes._screen_width * 0.7,
    height: '100%',
    marginLeft: 10,
  },
});
