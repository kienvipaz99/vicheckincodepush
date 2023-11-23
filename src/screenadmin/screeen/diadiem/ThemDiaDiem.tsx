import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import {Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../../res/fonts';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checknumberdayval, fullday} from '../../../data/checkday';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function ThemDiaDiem(props: Props) {
  const {name, diachi, datecheckstart, datecheckend, checkvitri, nhanvien} =
    props.route?.params?.item || {};
  const [names, setNames] = useState(name);
  const [diachis, setDiachi] = useState(diachi);
  const [timechekstart, settimechekstart] = useState(datecheckstart);
  const [timecheckend, settimecheckend] = useState(datecheckend);
  const [check, setCheck] = useState(checkvitri);
  const [select, setSelects] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showTime1, setShowTime1] = useState(false);

  return (
    <View style={stylescustom.container}>
      <Header
        title
        back
        onBackPress={() => {
          props.navigation.goBack();
        }}
        textTittle={'ĐỊA ĐIỂM'}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: sizes._screen_width * 0.9, alignItems: 'center'}}>
            <Text style={styles.text}>Thông tin địa chỉ</Text>

            <View style={styles.btn}>
              <MaterialCommunityIcons name="sitemap" color={'#3366FF'} size={25} />
              <TextInput value={names} onChangeText={setNames} style={styles.txt} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Map1')}>
              <Icon name="map-marker-radius" color={'#3366FF'} size={25} />
              <Text style={styles.text2}>{diachi ? diachi : 'Thêm vị trí'}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Thời gian check của địa chỉ</Text>
            <TouchableOpacity style={styles.btn} onPress={() => setShowTime(true)}>
              <Icon name="calendar-month" color={'#3366FF'} size={25} />
              <Text style={styles.text2}>
                {timechekstart ? fullday(timechekstart) : 'Thời gian bắt đầu'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setShowTime1(true)}>
              <Icon name="calendar-month" color={'#3366FF'} size={25} />
              <Text style={styles.text2}>
                {timecheckend ? fullday(timecheckend) : 'Thời gian kết thúc'}
              </Text>
            </TouchableOpacity>
            <View style={styles.item}>
              <View style={stylescustom.row1}>
                <MaterialCommunityIcons name="map-marker" color={'#3366FF'} size={25} />
                <Text style={styles.text2}>Check vị trí</Text>
              </View>
              <Switch
                value={check}
                onValueChange={(val: boolean) => setCheck(val)}
                color={'#3366FF'}
                style={{marginRight: 10}}
              />
            </View>
            <Text style={styles.text}>Thông tin người sử dụng</Text>

            <TouchableOpacity style={styles.item} onPress={() => setSelects(true)}>
              <View style={stylescustom.row1}>
                <MaterialCommunityIcons name="account-group" color={'#3366FF'} size={24} />
                <Text style={styles.text2}>Chọn nhân viên</Text>
              </View>
              <MaterialCommunityIcons name="chevron-down" size={25} color={'#3366FF'} />
            </TouchableOpacity>
            <View style={{marginTop: 25, width: sizes._screen_width * 0.9}}>
              <BuntomCustom1 text="Lưu" onpress={() => {}} />
            </View>
            <View
              style={{
                marginBottom: 10,
                marginTop: 20,
                width: sizes._screen_width * 0.9,
              }}>
              {props.route.params !== undefined && (
                <BuntomCustom1 text="Xóa" onpress={() => console.log('')} />
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <DateTimePickerModal
        isVisible={showTime}
        is24Hour={true}
        mode="date"
        onConfirm={(date: Date) => {
          settimechekstart(checknumberdayval(date));

          setShowTime(false);
        }}
        onCancel={() => setShowTime(false)}
      />
      <DateTimePickerModal
        isVisible={showTime1}
        is24Hour={true}
        mode="date"
        onConfirm={(date: Date) => {
          settimecheckend(checknumberdayval(date));
          setShowTime1(false);
        }}
        onCancel={() => setShowTime1(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big,
    width: '100%',
    marginLeft: sizes._20sdp,
    marginTop: sizes._25sdp,
    fontFamily: fonts.textRegular,
  },

  item: {
    flexDirection: 'row',
    width: sizes._screen_width * 0.9,
    height: sizes._50sdp,
    alignItems: 'center',
    backgroundColor: '#e8e9ec9e',
    marginTop: sizes._25sdp,
    borderRadius: 10,
    paddingLeft: 5,
    justifyContent: 'space-between',
  },
  text2: {
    color: 'black',
    fontSize: sizes._font_size_big,
    marginLeft: 5,
    opacity: 0.4,

    fontFamily: fonts.textRegular,
  },
  btn: {
    height: 50,
    width: sizes._screen_width * 0.9,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e8e9ec9e',
    marginTop: 20,
    borderRadius: sizes._10sdp,
    paddingLeft: 10,
  },
  txt: {
    height: 45,
    width: sizes.width * 0.75,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
    paddingHorizontal: 5,
  },
});
