import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../../component/Header';
import {NavigationProp} from '@react-navigation/native';
import {useGetWorkingShiftsQuery} from '../../redux/api/auth.api';
import Loading from '../../component/Loading';
import sizes from '../../res/sizes';
import chuyenDoiNgayTiengViet from '../../res/convert';
import {consvertTime} from '../../data/checkday';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';

export default function TodayAttendance({
  navigation,
  route,
}: {
  navigation: NavigationProp<Record<string, any>>;
  route: {
    params: {
      id: number;
    };
  };
}) {
  const {data, isLoading} = useGetWorkingShiftsQuery(`${route?.params?.id}`);

  return (
    <View style={styles.container}>
      <Header title textTittle={'lịch làm việc'} back onBackPress={() => navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <View style={styles.view}>
          <Text style={stylescustom.textName}>Ca làm việc: {data?.name}</Text>
          <Text style={stylescustom.textEmail}>Miêu tả: {data?.description}</Text>
          <Text style={stylescustom.textEmail}>Ngày bắt đầu: {data?.start_date} </Text>
          {data ? (
            <View style={styles.view1}>
              {data?.details.map((i, index) => {
                return (
                  <View key={index} style={styles.view2}>
                    <Text style={styles.txt}>{chuyenDoiNgayTiengViet(i?.weekday)}</Text>
                    <Text style={{...styles.txt, textAlign: 'center'}}>
                      {consvertTime(i?.start_at)}
                    </Text>
                    <Text style={{...styles.txt, textAlign: 'center'}}>
                      {consvertTime(i?.end_at)}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <>
              <Text style={stylescustom.textEmail}>Bạn không có lịch làm việc nào</Text>
              <Image source={images.notData} style={styles.view3} />
            </>
          )}
        </View>
      </View>
      {isLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    width: sizes._screen_width * 0.95,
    marginTop: sizes._screen_height * 0.01,
  },
  view1: {
    marginTop: sizes._screen_height * 0.012,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
  },
  view2: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    color: colors.colorblack,
    fontSize: sizes._screen_width * 0.04,
    fontFamily: fonts.textRegular,
    width: sizes._screen_width * 0.3,
    textAlign: 'left',
  },
  view3: {
    height: sizes.width * 0.5,
    width: sizes.width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: sizes.width * 0.1,
  },
});
