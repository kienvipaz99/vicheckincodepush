import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import stylescustom from '../../../res/stylescustom';
import Icon from 'react-native-vector-icons/MaterialIcons';

import sizes from '../../../res/sizes';
import ButonCustom from '../../../component/ButonCustom';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import {NavigationProp} from '@react-navigation/native';
interface ThemSachProps {
  navigation: NavigationProp<Record<string, any>>;
}
const ThemSach = (props: ThemSachProps) => {
  const [tensach, setTenSach] = React.useState('');
  const [mota, setMota] = React.useState('');

  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'Thêm sách'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <Text style={[styles.text1, {marginTop: 20}]}>Nhập tên sách</Text>
        <View style={styles.textinput1}>
          <TextInput
            value={tensach}
            onChangeText={(val: any) => setTenSach(val)}
            style={styles.text}
          />
        </View>
        <Text style={[styles.text1, {marginTop: 20}]}>Nhập tên sách</Text>
        <View style={styles.textinput}>
          <TextInput
            style={styles.text}
            multiline
            numberOfLines={4}
            cursorColor={'black'}
            value={mota}
            onChangeText={(val: any) => setMota(val)}
          />
        </View>
        <View style={{width: sizes._screen_width * 0.9, marginTop: 30}}>
          <BuntomCustom1 text="Lưu" onpress={() => props.navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

export default ThemSach;

const styles = StyleSheet.create({
  textinput: {
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',

    paddingLeft: 5,
    marginTop: sizes._10sdp,
    fontSize: sizes._font_size_big,
    color: 'black',
    height: 100,
  },
  text: {
    textAlignVertical: 'top',
    fontSize: sizes._font_size_big,
    color: 'black',
  },
  text1: {
    width: sizes._screen_width * 0.89,
    textAlignVertical: 'top',
    fontSize: sizes._font_size_big,
    color: 'black',
  },
  textinput1: {
    height: sizes._60sdp,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',

    paddingLeft: 5,
    marginTop: sizes._10sdp,
  },
});
