import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import BuntomCustom1 from '../../component/BuntomCustom1';
import Header from '../../component/Header';
import TextInputCustoms from '../../component/TextInputCustoms';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checknumberdayval, consvertTime, day, fullday, gettimesss} from '../../data/checkday';
import {NavigationProp} from '@react-navigation/native';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useCreateonleaveMutation} from '../../redux/api/auth.api';
import {vietsuberrors} from '../../data/vietsub/vietsuberrors';
interface XinGapKhachProps {
  navigation: NavigationProp<Record<string, any>>;
}
const XinGapKhach = (props: XinGapKhachProps) => {
  const [ngaynghi, setNgaynghi] = React.useState('');
  const [time, setTime] = React.useState('');
  const [times, setTimes] = React.useState('');
  const [errtime, seterrTime] = React.useState('');
  const [errtimes, seterrTimes] = React.useState('');
  const [noidung, setNoiDung] = React.useState('');
  const [openday, setOpenday] = React.useState(false);
  const [opentime, setOpentime] = React.useState(false);
  const [opentime1, setOpentime1] = React.useState(false);
  const [errNgaynghi, setErrNgayNghi] = React.useState('');
  const [errnoidung, setErrNoiDung] = React.useState('');
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const [submitonleave, {isLoading}] = useCreateonleaveMutation();
  const check = async () => {
    try {
      const aa = await submitonleave({
        employee_id: id,
        leave_duration: 'hours',
        day_type: 'first_half',
        leave_type_id: 5,
        date: ngaynghi,
        note: noidung,
        start_time: time,
        end_time: times,
      }).unwrap();
      Alert.alert(
        'Thông báo',
        `${aa?.message}`,
        [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error: any) {
      let err = error?.data?.errors;
      if (error?.data?.message) {
        Alert.alert(vietsuberrors(error?.data?.message));
      } else {
        setErrNgayNghi(vietsuberrors(err?.date));
        setErrNoiDung(vietsuberrors(err?.note));
        seterrTimes(vietsuberrors(err?.end_time));
        seterrTime(vietsuberrors(err?.start_time));
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'XIN ĐI GẶP KHÁCH HÀNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: sizes._screen_width}}>
          <View style={styles.view}>
            <Text style={styles.txt}>Chọn ngày bạn muốn xin:</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setOpenday(true);
                setErrNgayNghi('');
              }}>
              <Text style={styles.txt1}>{ngaynghi}</Text>
              <Image source={images.calendar} style={{marginRight: 8}} />
            </TouchableOpacity>
            {errNgaynghi && <Text style={stylescustom.err}>{errNgaynghi}</Text>}

            <View style={styles.item}>
              <View style={{width: sizes.width * 0.4}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Thời gian từ:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setOpentime(true);
                  }}>
                  <Text style={styles.txt1}>{consvertTime(time)}</Text>
                  <Image source={images.clock1} style={styles.img} />
                </TouchableOpacity>
                {errtime && <Text style={stylescustom.err}>{errtime}</Text>}
              </View>

              <View style={{width: sizes.width * 0.4}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Đến:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setOpentime1(true);
                  }}>
                  <Text style={styles.txt1}>{consvertTime(times)}</Text>
                  <Image source={images.clock1} style={{marginRight: 8, height: 26, width: 26}} />
                </TouchableOpacity>
                {errtimes && <Text style={stylescustom.err}>{errtimes}</Text>}
              </View>
            </View>

            <TextInputCustoms
              type
              img={images.note}
              placeholder="Nội dung"
              value={noidung}
              setValue={setNoiDung}
              seterr={setErrNoiDung}
            />
            {errnoidung && <Text style={stylescustom.err}>{errnoidung}</Text>}
          </View>
          <View style={styles.view1}>
            <BuntomCustom1 text="Gửi yêu cầu" onpress={check} isLoading={isLoading} />
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={openday}
        mode="date"
        onConfirm={(ab: Date) => {
          let a = fullday(ab);
          let b = day();
          if (a < b) {
            setErrNgayNghi('Ngày xin phép không được nhỏ hơn ngày hiện tại');
          } else {
            setNgaynghi(checknumberdayval(ab));
          }
          setOpenday(false);
        }}
        onCancel={() => setOpenday(false)}
      />
      <DateTimePickerModal
        isVisible={opentime}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          setTime(gettimesss(date));

          setOpentime(false);
        }}
        onCancel={() => setOpentime(false)}
      />
      <DateTimePickerModal
        isVisible={opentime1}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          setTimes(gettimesss(date));

          setOpentime1(false);
        }}
        onCancel={() => setOpentime1(false)}
      />
    </View>
  );
};

export default XinGapKhach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
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
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: sizes.width * 0.4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.width * 0.9,
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
  icon: {
    marginRight: 8,
    height: 21,
    width: 17,
    tintColor: '#959595',
    marginLeft: sizes._10sdp,
  },
  texinput: {
    width: '90%',
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  view: {
    width: '90%',
    marginTop: sizes._20sdp,
    marginBottom: 5,
    alignSelf: 'center',
  },
  view1: {
    width: sizes.width * 0.7,
    marginTop: sizes._25sdp,
    alignSelf: 'center',
    marginBottom: 50,
  },
  img: {marginRight: 8, height: 26, width: 26},
  btn3: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: sizes.width * 0.9,
    borderRadius: 10,
    borderColor: colors.colorText,
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  txt2: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
    marginLeft: 5,
  },
  icon1: {height: 25, width: 25, tintColor: '#959595'},
});
