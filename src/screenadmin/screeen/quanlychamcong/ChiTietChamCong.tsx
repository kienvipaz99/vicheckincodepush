import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../../res/fonts';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {consvertTime, consvertTimeToday, convertTimeToMinutes} from '../../../data/checkday';
import chuyenDoiNgayTiengViet, {isDay} from '../../../res/convert';
import {useEmployeeQuery, useGetWorkingShiftsQuery} from '../../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
import {RootState} from '../../../redux/store';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const ChiTietChamCong = (props: Props) => {
  let a = props.route?.params?.item;
  const day = a[0]?.in_date;
  let b = new Date(day).getDay();
  const d = new Date(day);
  let dd = String(d.getDate()).padStart(2, '0');
  let mm = String(d.getMonth() + 1).padStart(2, '0');
  let yyyy = d.getFullYear();
  let as = dd + '/' + mm + '/' + yyyy;
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data.infoUser?.id);
  const trangthai =
    a[0]?.behavior === 'late' ? 'Muộn' : a[0]?.behavior === 'early' ? 'Đúng giờ' : null;
  const colorTrangThai =
    trangthai == 'Muộn'
      ? colors.colorOrange
      : trangthai == 'Đúng giờ'
      ? colors.colorGreen
      : undefined;
  const {data} = useEmployeeQuery(`${id}`);
  const working_shift_id = props.route?.params?.idatendance;
  const {data: dataWorking} = useGetWorkingShiftsQuery(`${working_shift_id}`);

  const checktime = () => {
    const thuElement = dataWorking?.details.find(item => item.weekday === isDay(b));

    let dimuon =
      convertTimeToMinutes(consvertTimeToday(a[0]?.details[0]?.in_time)) -
      convertTimeToMinutes(consvertTime(thuElement?.start_at));
    dimuon = dimuon < 0 ? 0 : dimuon;
    let vesom =
      convertTimeToMinutes(consvertTime(thuElement?.end_at)) -
      convertTimeToMinutes(consvertTimeToday(a[0]?.details[0]?.out_time));
    vesom = vesom < 0 ? 0 : vesom;

    return {dimuon, vesom};
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Chi tiết chấm công'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={styles.item1}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 1}}
            colors={['#12449a', '#045ec5']}
            style={styles.view}>
            <Text style={styles.txt5}>{chuyenDoiNgayTiengViet(b)}</Text>
            <Text style={styles.txt5}>{', ' + as}</Text>
          </LinearGradient>

          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Tên nhân viên</Text>
            </View>
            <Text style={styles.txt2}>{data?.full_name}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Phòng</Text>
            </View>
            <Text style={styles.txt2}>{data?.department?.name}</Text>
          </View>
        </View>
        <View style={styles.item1}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 1}}
            colors={['#12449a', '#045ec5']}
            style={styles.view1}>
            <Text style={styles.txt5}>Thông tin chi tiết</Text>
          </LinearGradient>

          {/* <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Số công</Text>
            </View>
            <Text style={styles.txt2}>0</Text>
          </View> */}
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Trạng thái</Text>
            </View>
            <Text
              style={[
                styles.txt2,
                {
                  color: colorTrangThai,
                },
              ]}>
              {trangthai}
            </Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Thời gian checkin</Text>
            </View>
            <Text style={styles.txt2}>{consvertTimeToday(a[0]?.details[0]?.in_time)}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Thời gian check out</Text>
            </View>
            <Text style={styles.txt2}>{consvertTimeToday(a[0]?.details[0]?.out_time)}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Số phút đi muộn</Text>
            </View>
            <Text style={styles.txt2}>{checktime()?.dimuon} phút</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item2}>
              <Text style={styles.txt1}>Số phút về sớm</Text>
            </View>
            <Text style={styles.txt2}>{checktime()?.vesom} phút</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChiTietChamCong;

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 80,
    borderRadius: 60,
  },
  txt: {
    color: 'black',
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textBold,

    marginTop: 10,
  },
  txt1: {
    color: 'black',
    fontSize: sizes._font_size_big_big_large,
    marginLeft: sizes._10sdp,
    fontFamily: fonts.textRegular,
  },
  txt2: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textBold,
  },

  item: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35,
  },
  item1: {
    width: '95%',
    backgroundColor: colors.colorWhite,
    marginTop: sizes._25sdp,
    borderRadius: 10,
    paddingBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: sizes._10sdp,
  },
  txt5: {
    fontSize: sizes._font_size_big,
    color: colors.colorWhite,
    fontFamily: fonts.textRegular,
  },
  view: {
    height: 50,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  view1: {
    height: 50,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
