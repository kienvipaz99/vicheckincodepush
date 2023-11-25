import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import stylescustom from '../res/stylescustom';
import Header from '../component/Header';
import sizes from '../res/sizes';
import ngaycong from '../data/ngaycong';
import colors from '../res/color';
import RenderNgayCong from '../screenadmin/component/RenderNgayCong';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import itemnote from '../data/itemnote';
import ModalDate from '../component/modal/ModalDate';
import fonts from '../res/fonts';
import images from '../res/images';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {
  useGetAttendanceSumaryQuery,
  useGetEmployeeReportQuery,
  useGetemployee_attendanceQuery,
  useLeavesAllowancesQuery,
} from '../redux/api/auth.api';
import {RootState} from '../redux/store';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
let today = new Date();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'fr';
export default function BaoCaoChamCong(props: Props) {
  //@ts-ignore
  const numberday = new Date(yyyy, mm, 0).getDate();
  const [MD, setMD] = useState<number>();
  const [MM, setMM] = useState<number>();
  const {data: report} = useGetEmployeeReportQuery('');
  const [show, setShow] = useState(false);
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const findItem = () => {
    let sophut = 0;
    let socong = 0;
    const datas = report?.data?.filter((item: User) => item?.id === id);
    datas?.forEach((item: User) => {
      sophut += item?.in_time_late || 0;
      socong += item?.work || 0;
    });
    return {sophut, socong};
  };
  const {data: ngayCong} = useGetAttendanceSumaryQuery({
    id: id,
    page: 31,
    month_number: MD ? MD - 1 : mm - 1,
    year: MM ? MM : yyyy,
  });
  const {data: dataAtendance} = useGetemployee_attendanceQuery('');
  const keyedData: {[key: string]: getAttendanceSumary[]} = {};
  ngayCong?.data?.map((item: getAttendanceSumary) => {
    const key = item?.in_date;
    keyedData[key] = [item];
  });
  const {data: leaves} = useLeavesAllowancesQuery(`${id}`);
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'BÁO CÁO CHẤM CÔNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: sizes.width}}>
          <View style={styles.item}>
            <RenderNgayCong
              numberday={numberday}
              dimuon={findItem().sophut}
              ngaycong={findItem().socong}
              leaves={leaves?.allowances}
            />
            <View style={styles.item3}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.calendar} resizeMode={'contain'} style={styles.icon} />
                <Text style={styles.text}>Lịch sử chấm công</Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  props.navigation.navigate('LocBaoCao', {
                    day: {
                      MM,
                      MD,
                    },
                  })
                }>
                <Image source={images.loc} style={styles.icon1} />
              </TouchableOpacity>
            </View>
            <Calendar
              style={[styles.view1, stylescustom.shadowitem]}
              hideExtraDays={true}
              firstDay={1}
              markingType={'custom'}
              renderHeader={date => {
                let a = new Date(date);
                let mm = a.getMonth() + 1;
                let yyyy = a.getFullYear();
                let ccc = mm + ',' + yyyy;
                try {
                  setMD(mm);
                  setMM(yyyy);
                } catch (e) {
                  console.log(e);
                }
                return (
                  <View>
                    <Text style={styles.txtthang}>Tháng {ccc}</Text>
                  </View>
                );
              }}
              dayComponent={({date}: any) => {
                let a = keyedData[date?.dateString];
                const firstItem = a ? a[0] : null;
                const details = firstItem?.behavior;
                const coloraa =
                  details == 'early' ? '#00a651' : details == 'late' ? '#f26522' : 'black';
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (a) {
                        props.navigation.navigate('ChiTietChamCong', {
                          item: a,
                          idatendance: dataAtendance?.working_shift_id,
                        });
                      } else {
                        setShow(true);
                      }
                    }}>
                    <View style={[styles.viewday]}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: fonts.textRegular,
                          color: coloraa,
                        }}>
                        {date.day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              theme={{
                textDayHeaderFontSize: 15,
                textDayHeaderFontFamily: fonts.textBold,
                textSectionTitleColor: 'black',
              }}
              renderArrow={direction => {
                return (
                  <View>
                    {direction === 'left' && (
                      <Icons name="chevron-left" size={sizes._font_size_big} color={'black'} />
                    )}
                    {direction === 'right' && (
                      <Icons name="chevron-right" size={sizes._font_size_big} color={'black'} />
                    )}
                  </View>
                );
              }}
            />
            <View style={styles.item4}>
              {itemnote.map((item: any, index: any) => {
                return (
                  <View key={index} style={styles.view3}>
                    <View style={[styles.note, {backgroundColor: item.color}]} />
                    <Text style={styles.txt}>{item.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalDate
        isShow={show}
        toggleDate={() => {
          setShow(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    width: '90%',
    marginTop: sizes._25sdp,
    height: sizes._45sdp,
    alignSelf: 'center',
  },
  item: {
    width: '100%',

    marginBottom: 20,
  },
  text: {
    fontSize: sizes._font_size_big,
    color: '#505050',
    fontFamily: fonts.textBold,
    marginLeft: 7,
  },
  item1: {
    height: sizes._70sdp,
    width: sizes._screen_width * 0.4,
    backgroundColor: colors.colorOrange1,
    borderRadius: 10,
    marginTop: sizes._20sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text1: {
    fontSize: sizes._font_size_big,
    color: 'black',
    fontWeight: '600',
  },
  note: {
    height: 12,
    width: 12,
    borderRadius: 30,
  },
  item3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._20sdp,
    marginLeft: sizes._25sdp,
    justifyContent: 'space-between',
  },
  viewday: {
    height: sizes._30sdp,
    width: sizes._30sdp,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
  },

  txtthang: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: 'black',
  },
  item4: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: sizes._20sdp,
  },
  icon: {height: 25, width: 23, tintColor: '#505050'},
  btn: {
    height: 40,
    width: 40,
    right: sizes._screen_width * 0.03,
  },
  view1: {
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    marginTop: sizes._20sdp,
    alignSelf: 'center',
  },
  view3: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: sizes._font_size_large,
    marginLeft: 5,
  },
  icon1: {
    height: 40,
    width: 40,
  },
});
