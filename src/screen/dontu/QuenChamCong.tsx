import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import colors from '../../res/color';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import images from '../../res/images';
import TextInputCustoms from '../../component/TextInputCustoms';
import BuntomCustom1 from '../../component/BuntomCustom1';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  checknumberdayval,
  consvertTime,
  consvertTime1,
  gettimesss,
  gettimesss1,
  gettimesss2,
} from '../../data/checkday';
import {NavigationProp} from '@react-navigation/native';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useCreataddAtendeeMutation} from '../../redux/api/auth.api';
import {vietsuberrors} from '../../data/vietsub/vietsuberrors';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function QuenChamCong(props: Props) {
  const [showNgay, setShowNgay] = useState(false);
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const [days, setDays] = useState('');
  const [time, setTime] = useState('');
  const [showtime, setShowTime] = useState(false);
  const [times, setTimes] = useState('');
  const [showtimes, setShowTimes] = useState(false);
  const [addAtendee, {isLoading}] = useCreataddAtendeeMutation();
  const [errors, setErrors] = useState({
    employee_id: '',
    in_date: '',
    in_time: '',
    out_time: '',
  });
  const [note, setNote] = useState('');
  const Submit = async () => {
    try {
      const aa = await addAtendee({
        in_date: days,
        employee_id: id,
        in_time: time,
        out_time: times,
        note: note,
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
      const err = error?.data?.errors;
      console.log(error, '123');

      if (error?.status == 403) {
        Alert.alert(error?.data?.message);
      } else {
        setErrors({
          employee_id: vietsuberrors(err?.employee_id),
          in_date: vietsuberrors(err?.in_date),
          in_time: vietsuberrors(err?.in_time),
          out_time: vietsuberrors(err?.out_time),
        });
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'QUÊN CHẤM CÔNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.txt}>Thời gian quên chấm công:</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowNgay(true);
              }}>
              <Text style={styles.txt1}>{days}</Text>
              <Image source={images.calendar} style={styles.img} />
            </TouchableOpacity>
            {errors?.in_date && <Text style={stylescustom.err}>{errors?.in_date}</Text>}

            <View style={stylescustom.row2}>
              <View style={{width: sizes.width * 0.4}}>
                <TouchableOpacity
                  style={styles.btn2}
                  onPress={() => {
                    setShowTime(true);
                  }}>
                  <Text style={styles.txt1}>{consvertTime1(time)}</Text>
                  <Image source={images.clock1} style={styles.img} />
                </TouchableOpacity>
                {errors?.in_time && <Text style={stylescustom.err}>{errors?.in_time}</Text>}
              </View>

              <View style={{width: sizes.width * 0.4}}>
                <TouchableOpacity
                  style={styles.btn2}
                  onPress={() => {
                    setShowTimes(true);
                  }}>
                  <Text style={styles.txt1}>{consvertTime1(times)}</Text>
                  <Image source={images.clock1} style={styles.img} />
                </TouchableOpacity>
                {errors?.out_time && <Text style={stylescustom.err}>{errors?.out_time}</Text>}
              </View>
            </View>
            <TextInputCustoms
              type={true}
              img={images.note}
              placeholder="Nội dung"
              value={note}
              setValue={setNote}
            />
            <View style={styles.btn1}>
              <BuntomCustom1 text="Gửi yêu cầu" onpress={Submit} isLoading={isLoading} />
            </View>
          </View>
        </ScrollView>
      </View>

      <DateTimePickerModal
        isVisible={showNgay}
        mode="date"
        onConfirm={(ab: Date) => {
          setDays(checknumberdayval(ab));
          setShowNgay(false);
        }}
        onCancel={() => setShowNgay(false)}
      />
      <DateTimePickerModal
        isVisible={showtime}
        mode="datetime"
        onConfirm={(ab: Date) => {
          setTime(gettimesss1(ab));
          setShowTime(false);
        }}
        onCancel={() => setShowTime(false)}
      />
      <DateTimePickerModal
        isVisible={showtimes}
        mode="datetime"
        onConfirm={(ab: Date) => {
          setTimes(gettimesss1(ab));
          setShowTimes(false);
        }}
        onCancel={() => setShowTimes(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    marginTop: 10,
  },
  container: {
    width: '90%',
    marginTop: sizes._20sdp,
    alignSelf: 'center',
    marginBottom: 10,
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
  btn2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.width * 0.4,
    alignSelf: 'flex-end',
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
  img: {marginRight: 5, height: 27, width: 27},
  btn1: {marginTop: sizes._20sdp, width: sizes.width * 0.75, alignSelf: 'center'},
});
