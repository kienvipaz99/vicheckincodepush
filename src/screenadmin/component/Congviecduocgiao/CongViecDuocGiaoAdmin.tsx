import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Calendar} from 'react-native-calendars';
import Icons from 'react-native-vector-icons/FontAwesome';
import sizes from '../../../res/sizes';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import fonts from '../../../res/fonts';
import colors from '../../../res/color';

import chuyenDoiNgayTiengViet from '../../../res/convert';
import {useGetAsignedTaskQuery} from '../../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';

let d = new Date().toISOString().slice(0, 10);
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function CongViecDuocGiaoAdmin(props: Props) {
  const {data} = useGetAsignedTaskQuery({});
  const [datas, setDatas] = useState<any>();

  useEffect(() => {
    const groupedData = data?.data.reduce((acc: any, item: getAssignedTask) => {
      const key = item?.start_date;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    setDatas(groupedData);
  }, [data]);
  const [selectday, setSelectday] = React.useState<any>(d);

  const [item, setItem] = useState<any>();
  let b = new Date(selectday).getDay();
  const daa = new Date(selectday);
  let dd = String(daa.getDate()).padStart(2, '0');
  let mm = String(daa.getMonth() + 1).padStart(2, '0');
  let yyyy = daa.getFullYear();
  let as = dd + '/' + mm + '/' + yyyy;
  const renderItem = ({item, index}: any) => {
    return (
      <View style={[styles.item2, stylescustom.shadowitem]}>
        <View style={styles.view} />
        <View style={{marginTop: 5, marginBottom: 5}}>
          <Text style={styles.txtthang1}>Tiêu đề : {item?.title}</Text>
          <Text style={styles.txtthang1}>Đến hạn: {item?.dateline}</Text>
          <Text style={styles.txtthang1}>Mô tả: {item?.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'CÔNG VIỆC ĐÃ GIAO'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
        iconadd
        opressadd={() => props.navigation.navigate('GiaoViec')}
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
            // const coloraa = datas[date?.dateString] == undefined ? 'transparent' : 'red';
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectday(date?.dateString);
                  setItem(datas[date?.dateString]);
                }}>
                <View style={[styles.viewday, {backgroundColor: background}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: fonts.textRegular,
                      color: colora,
                    }}>
                    {date.day}
                  </Text>
                  <View
                    style={{
                      height: 3,
                      width: 3,
                      // backgroundColor: coloraa,
                      borderRadius: 30,
                    }}
                  />
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
        <View
          style={{
            flex: 1,

            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.item}>
            <Text style={styles.txtthang}>{chuyenDoiNgayTiengViet(b)}</Text>
            <Text style={styles.txtthang}> {as}</Text>
          </View>

          {item === undefined ? (
            <View style={styles.item1}>
              <Text
                style={{
                  fontFamily: fonts.textitalic,
                  color: colors.colorText,
                  fontSize: sizes._font_size_big,
                }}>
                {'Bạn không có công việc nào'}
              </Text>
            </View>
          ) : (
            <FlatList data={item || []} renderItem={renderItem} style={{width: '100%'}} />
          )}
        </View>
      </View>
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
    backgroundColor: 'white',
    borderRadius: sizes._10sdp,
    elevation: 5,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  txtthang1: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: 'black',
    marginLeft: sizes._10sdp,
  },
  view: {
    backgroundColor: 'green',
    width: sizes._15sdp,
    borderBottomLeftRadius: sizes._10sdp,
    borderTopLeftRadius: sizes._10sdp,
  },
});
