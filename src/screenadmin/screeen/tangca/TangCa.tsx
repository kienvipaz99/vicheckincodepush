import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import images from '../../../res/images';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import fonts from '../../../res/fonts';
import {day, fullday, time_convert, time_convert1} from '../../../data/checkday';
import TextInputCustoms from '../../../component/TextInputCustoms';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checkdatatime, isRequired} from '../../../res/validate';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function TangCa(props: Props) {
  const [today, setToday] = useState(new Date());
  const [errtoday, setErrToday] = useState('');

  const [batdau, setBatDau] = useState<any>();
  const [ketthuc, setKetThuc] = useState<any>();
  const [errbatdau, setErrBatDau] = useState<any>('');
  const [errketthuc, setErrKetThuc] = useState<any>('');
  const [showbatdau, setShowBatDau] = useState(false);
  const [showketthuc, setShowKetThuc] = useState(false);
  const [showchonngay, setshowchonngay] = useState(false);
  const [noidung, setNoiDung] = useState('');
  const [errnoidung, setErrNoiDung] = useState('');

  const check = () => {
    let checktimestart = checkdatatime(batdau);
    let checktimesend = checkdatatime(ketthuc);
    let checkNoidung = isRequired(noidung);
    if (!checktimestart) {
      setErrBatDau('Chọn thời gian');
    } else {
      setErrBatDau('');
    }
    if (!checktimesend) {
      setErrKetThuc('Chọn thời gian');
    } else {
      setErrKetThuc('');
    }
    if (!checkNoidung) {
      setErrNoiDung('Nhập nội dung');
    } else {
      setErrNoiDung('');
    }
    if (checktimestart && checktimesend && checkNoidung) {
      props.navigation.goBack();
    }
  };
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'ĐƠN TĂNG CA'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width * 0.9, marginTop: 20}}>
          <Text style={styles.txt1}>Ngày xin tăng ca</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setshowchonngay(true);
            }}>
            <Text style={styles.txt1}>{fullday(today)}</Text>
            <Image
              resizeMode="contain"
              source={images.calendar}
              style={{marginRight: 8, height: 26, width: 26}}
            />
          </TouchableOpacity>
          {errtoday ? <Text style={stylescustom.err}>{errtoday}</Text> : null}
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => {
              setShowBatDau(true);
            }}>
            <Text style={styles.txt1}>
              {batdau ? time_convert(batdau) : 'Chọn thời gian bắt đầu'}
            </Text>
            <Image
              resizeMode="contain"
              source={images.clock1}
              style={{marginRight: 8, height: 30, width: 30}}
            />
          </TouchableOpacity>
          {errbatdau ? <Text style={stylescustom.err}>{errbatdau}</Text> : null}

          <TouchableOpacity
            style={styles.btn1}
            onPress={() => {
              setShowKetThuc(true);
            }}>
            <Text style={styles.txt1}>
              {ketthuc ? time_convert(ketthuc) : 'Chọn thời gian kết thúc'}
            </Text>
            <Image
              resizeMode="contain"
              source={images.clock1}
              style={{marginRight: 8, height: 30, width: 30}}
            />
          </TouchableOpacity>
          {errketthuc ? <Text style={stylescustom.err}>{errketthuc}</Text> : null}

          <View>
            <Text style={[styles.txt, {marginTop: sizes._30sdp}]}>Nội dung:</Text>
            <TextInputCustoms
              type={true}
              img={images.note}
              placeholder="Nội dung"
              value={noidung}
              setValue={setNoiDung}
            />
          </View>
          {errnoidung ? <Text style={stylescustom.err}>{errnoidung}</Text> : null}

          <View style={{marginTop: 25, width: '75%', alignSelf: 'center'}}>
            <BuntomCustom1 text="Gửi yêu cầu" onpress={check} />
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={showbatdau}
        is24Hour={true}
        mode="time"
        onConfirm={(date: any) => {
          let a = time_convert1(date);
          setBatDau(a);

          setShowBatDau(false);
        }}
        onCancel={() => setShowBatDau(false)}
      />
      <DateTimePickerModal
        isVisible={showketthuc}
        is24Hour={true}
        mode="time"
        onConfirm={(date: any) => {
          if (batdau == undefined) {
            setErrBatDau('Chọn thời gian');
          } else {
            if (time_convert1(date) < batdau) {
              setErrKetThuc('Thời gian kết thúc phải lớn hơn bắt đầu');
            } else {
              setKetThuc(time_convert1(date));
            }
          }

          setShowKetThuc(false);
        }}
        onCancel={() => setShowKetThuc(false)}
      />
      <DateTimePickerModal
        isVisible={showchonngay}
        is24Hour={true}
        mode="date"
        onConfirm={(date: any) => {
          let aa: any = new Date(date).getTime();
          let bb: any = new Date().getTime();

          if (aa < bb) {
            setErrToday('Ngày được chọn phải lớn hơn hiện tại');
          } else {
            setToday(aa);
          }

          setshowchonngay(false);
        }}
        onCancel={() => setshowchonngay(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn1: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes._screen_width * 0.9,
    marginTop: 20,
    paddingLeft: 10,
  },
  btn: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes._screen_width * 0.9,
    marginTop: 5,
    paddingLeft: 10,
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
});
