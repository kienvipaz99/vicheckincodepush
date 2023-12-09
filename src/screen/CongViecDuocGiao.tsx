import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import stylescustom from '../res/stylescustom';
import {Calendar} from 'react-native-calendars';
import Icons from 'react-native-vector-icons/FontAwesome';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import colors from '../res/color';
import {useGetAsignedTaskQuery} from '../redux/api/auth.api';
import Loading from '../component/Loading';
import {thu11} from '../data/checkday';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {NavigationProp} from '@react-navigation/core';
let d = new Date().toISOString().slice(0, 10);
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function CongViecDuocGiao(props: Props) {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const {data: AsignTask, isLoading} = useGetAsignedTaskQuery({
    user_id: id,
  });
  const ngayCongViec: any = {};
  const mauCongViec = ['#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33FF'];
  AsignTask?.data.forEach((congViec: getAssignedTask) => {
    const startDate = new Date(congViec.start_date);
    const endDate = new Date(congViec.end_date);
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      if (!ngayCongViec[formattedDate]) {
        ngayCongViec[formattedDate] = [];
      }
      const congViecMau = {...congViec, color: mauCongViec[congViec.id % mauCongViec.length]};
      ngayCongViec[formattedDate].push(congViecMau);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  const [selectday, setSelectday] = React.useState<string>(d);
  const [data, setData] = useState<getAssignedTask[]>();
  useEffect(() => {
    setData(ngayCongViec[d]);
  }, [AsignTask]);
  const daa = new Date(selectday);
  let dd = String(daa?.getDate()).padStart(2, '0');
  let mm = String(daa?.getMonth() + 1).padStart(2, '0');
  let yyyy = daa?.getFullYear();
  let as = dd + '/' + mm + '/' + yyyy;
  const renderItem = ({item}: {item: getAssignedTask}) => {
    return (
      <View style={[styles.item2, stylescustom.shadowitem]}>
        <View
          style={{
            backgroundColor: item?.color,

            width: sizes._15sdp,
            borderBottomLeftRadius: sizes._10sdp,
            borderTopLeftRadius: sizes._10sdp,
          }}
        />
        <View style={{marginTop: 5, marginBottom: 5}}>
          <Text style={styles.txtthang1}>Tiêu đề : {item?.name}</Text>
          <Text style={styles.txtthang1}>Đến hạn: {item?.end_date}</Text>
          <Text style={styles.txtthang1}>Mô tả: {item?.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'CÔNG VIỆC ĐƯỢC GIAO'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <Calendar
          style={{
            width: sizes._screen_width,
          }}
          hideExtraDays={true}
          firstDay={1}
          markingType={'custom'}
          renderHeader={date => {
            let a = new Date(date);
            let mm = String(a.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = a.getFullYear();
            let ccc = mm + ',' + yyyy;
            return (
              <>
                <Text style={styles.txtthang}>Tháng {ccc}</Text>
              </>
            );
          }}
          dayComponent={({date}: any) => {
            const colora = date?.dateString == selectday ? 'white' : 'black';
            const background = date?.dateString === selectday ? 'green' : 'transparent';
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectday(date?.dateString);
                  setData(ngayCongViec[date?.dateString]);
                }}>
                <View style={[styles.viewday, {backgroundColor: background}]}>
                  <Text
                    style={{
                      fontSize: sizes.width * 0.04,
                      fontFamily: fonts.textRegular,
                      color: colora,
                    }}>
                    {date.day}
                  </Text>
                  <View style={styles.view}>
                    {ngayCongViec[date?.dateString]?.map((item: getAssignedTask, index: number) => {
                      return (
                        <View
                          key={'oke' + index}
                          style={{
                            height: 3,
                            width: 3,
                            backgroundColor: item?.color,
                            borderRadius: 30,
                          }}
                        />
                      );
                    })}
                  </View>
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
              <View style={{top: -3}}>
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
        <View style={styles.view2}>
          <View style={styles.item}>
            <Text style={styles.txtthang}>{thu11()}</Text>
            <Text style={styles.txtthang}> {as}</Text>
          </View>

          {data === undefined ? (
            <View style={styles.item1}>
              <Text style={styles.txt}>{'Bạn không có công việc nào'}</Text>
            </View>
          ) : (
            <FlatList
              data={data || []}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.view1}
            />
          )}
        </View>
      </View>
      {isLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  txtthang: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: 'black',
  },
  viewday: {
    height: sizes._35sdp,
    width: sizes._35sdp,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._25sdp,
    width: sizes._screen_width * 0.9,
  },
  item1: {
    alignSelf: 'center',
    width: sizes._screen_width * 0.9,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: sizes._10sdp,
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 5,
  },
  item2: {
    width: sizes._screen_width * 0.9,
    borderRadius: sizes._10sdp,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  txtthang1: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: 'black',
    marginLeft: sizes._10sdp,
  },
  view: {flexDirection: 'row', alignItems: 'center'},
  txt: {
    fontFamily: fonts.textitalic,
    color: colors.colorText,
    fontSize: sizes._font_size_big,
  },
  view1: {marginTop: 20, width: sizes.width},
  view2: {
    flex: 1,

    width: '100%',
    alignItems: 'center',
  },
});
