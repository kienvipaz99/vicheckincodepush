import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import BuntomCustom1 from '../../component/BuntomCustom1';
import sizes from '../../res/sizes';
import images from '../../res/images';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import itemloaixin from '../../data/itemdontu/itemloaixin';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInputCustoms from '../../component/TextInputCustoms';
import ModalVeSom from '../../component/modal/ModalVeSom';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function DiSomVeMuon(props: Props) {
  const [loaiXin, setLoaiXin] = useState<any>();
  const [errLoaiXin, setErrloaiXin] = useState<string>('');
  const [errNgayxin, setErrNgayxin] = useState<string>('');
  const [errGio, setErrGio] = useState<string>('');
  const [showLoaiXin, setShowLoaiXin] = useState<boolean>(false);
  const chonloaixin = (val: any) => {
    setLoaiXin(val);
  };
  const [ngayXin, setNgayXin] = useState<string>('');
  const [showTime, setShowTime] = useState<boolean>(false);
  const [gioXin, setGioXin] = useState<string>('Chọn giờ');
  const [showNgay, setShowNgay] = useState<boolean>(false);
  const [noidung, setNoiDung] = React.useState('');

  const check = () => {};

  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'ĐI MUỘN VỀ SỚM'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView
          style={{
            width: sizes._screen_width,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={styles.item1}>
              <Text style={styles.txt}>Thời gian bạn đi muộn về sớm:</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setShowLoaiXin(true);
                }}>
                <Text style={styles.txt1}>{loaiXin?.name ? loaiXin?.name : 'Loại xin phép'}</Text>
                <Image source={images.note} style={{marginRight: 5, height: 24, width: 24}} />
              </TouchableOpacity>
              {errLoaiXin ? <Text style={styles.err}>{errLoaiXin}</Text> : null}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setShowNgay(true);
                  setErrNgayxin('');
                }}>
                <Text style={styles.txt1}>
                  {ngayXin ? ngayXin : 'Chọn ngày xin đi muộn về sớm'}
                </Text>
                <Image source={images.calendar} style={{marginRight: 8, width: 24, height: 24}} />
              </TouchableOpacity>
              {errNgayxin ? <Text style={styles.err}>{errNgayxin}</Text> : null}
              <View style={{width: '40%', alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  style={styles.btn3}
                  onPress={() => {
                    setShowTime(true);
                    setErrGio('');
                  }}>
                  <Text style={styles.txt1}>{gioXin}</Text>
                  <Image source={images.clock1} style={{marginRight: 5}} />
                </TouchableOpacity>
                {errGio ? <Text style={styles.err}>{errGio}</Text> : null}
              </View>

              <Text style={[styles.txt, {marginTop: sizes._30sdp}]}>Lý do bạn đi muộn về sớm:</Text>
              <TextInputCustoms
                type={true}
                img={images.note}
                placeholder="Nội dung"
                value={noidung}
                setValue={setNoiDung}
              />
            </View>
            <View style={styles.btn2}>
              <BuntomCustom1 text="Gửi yêu cầu" onpress={check} />
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalVeSom
        name="Chọn loại xin"
        isShow={showLoaiXin}
        item={itemloaixin}
        select={chonloaixin}
        toggleDate={() => setShowLoaiXin(false)}
      />
      <DateTimePickerModal
        isVisible={showNgay}
        mode="date"
        onConfirm={(ab: any) => {
          const d = new Date(ab);
          let dd = String(d.getDate()).padStart(2, '0');
          let mm = String(d.getMonth() + 1).padStart(2, '0');
          let yyyy = d.getFullYear();
          let a = dd + '/' + mm + '/' + yyyy;

          setNgayXin(a);
          setShowNgay(false);
        }}
        onCancel={() => setShowNgay(false)}
      />
      <DateTimePickerModal
        isVisible={showTime}
        is24Hour={true}
        mode="time"
        onConfirm={(date: any) => {
          let a = new Date(date).getHours();
          let b = new Date(date).getMinutes();
          setGioXin(a + ':' + b);
          setShowTime(false);
        }}
        onCancel={() => setShowTime(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
  },
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  btn: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn3: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn1: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  btn2: {width: '75%', marginTop: sizes._25sdp},
  item1: {width: '90%', marginTop: sizes._20sdp, marginBottom: 5},
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
});
