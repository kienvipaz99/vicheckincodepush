import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import images from '../../res/images';
import TextInputCustoms from '../../component/TextInputCustoms';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BuntomCustom1 from '../../component/BuntomCustom1';
import {useGetAllWorkingShiftsQuery} from '../../redux/api/auth.api';
import Modalselect from '../../component/modal/Modalselect';
import {NavigationProp} from '@react-navigation/native';
let today = new Date();
let d: any = today.getDate();
let mm = String(today.getMonth() + 1); //January is 0!
let yyyy = today.getFullYear();
let day = d + '/' + mm + '/' + yyyy;
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function DangKyCa(props: Props) {
  const [noidung, setNoiDung] = useState<string>('');
  const [calam, setCalam] = useState<any>();
  const [chonNgay, setChonNgay] = useState<string>('Chọn ngày');
  const [showNgay, setShowNgay] = useState<boolean>(false);
  const [errChonNgay, setErrChonNgay] = useState<string>('');
  const [errChonCa, setErrChonCa] = useState<string>('');
  const [errnoidung, setErrNoiDung] = useState<string>('');
  const [showChonCa, setShowChonCa] = useState<boolean>(false);
  const {data} = useGetAllWorkingShiftsQuery('');
  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'ĐĂNG KÝ CA LÀM'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              width: '90%',
              marginTop: sizes._20sdp,
              marginBottom: 5,
              alignSelf: 'center',
            }}>
            <Text style={styles.txt}>Chọn ca làm của bạn:</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowNgay(true);
                setErrChonNgay('');
              }}>
              <Text style={styles.txt1}>{chonNgay}</Text>
              <Image source={images.calendar} style={{marginRight: 8, height: 25, width: 23.5}} />
            </TouchableOpacity>
            {errChonNgay ? <Text style={stylescustom.err}>{errChonNgay}</Text> : null}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowChonCa(true);
                setErrChonCa('');
              }}>
              <Text style={styles.txt1}>{calam ? calam?.name : 'Chọn ca làm'}</Text>
              <Image source={images.clock1} style={{marginRight: 8, height: 26, width: 26}} />
            </TouchableOpacity>
            {errChonCa ? <Text style={stylescustom.err}>{errChonCa}</Text> : null}

            <Text style={[styles.txt, {marginTop: sizes._30sdp}]}>Lý do :</Text>
            <TextInputCustoms
              type={true}
              img={images.note}
              placeholder="Nội dung"
              value={noidung}
              setValue={setNoiDung}
              seterr={setErrNoiDung}
            />
            {errnoidung ? <Text style={stylescustom.err}>{errnoidung}</Text> : null}

            <View
              style={{
                marginTop: sizes._20sdp,
                width: '75%',
                alignSelf: 'center',
              }}>
              <BuntomCustom1 text="Gửi yêu cầu" onpress={() => {}} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modalselect
        isShow={showChonCa}
        name="Chọn ca làm"
        toggleDate={() => setShowChonCa(false)}
        item={data?.data}
        select={setCalam}
      />
      <DateTimePickerModal
        isVisible={showNgay}
        mode="date"
        onConfirm={(ab: any) => {
          const dd = new Date(ab);
          let ddd = String(dd.getDate());
          let mm = String(dd.getMonth() + 1);
          let yyyy = dd.getFullYear();
          let a = ddd + '/' + mm + '/' + yyyy;
          if (day < a) {
            setChonNgay(a);
          } else {
            setErrChonNgay('Bạn không thể chọn ngày nhỏ hơn hiện tại');
          }
          setShowNgay(false);
        }}
        onCancel={() => setShowNgay(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
    color: colors.colorText,
  },

  txt1: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    marginLeft: 10,
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
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
});
