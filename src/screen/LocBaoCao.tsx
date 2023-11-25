import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import colors from '../res/color';
import fonts from '../res/fonts';
import sizes from '../res/sizes';
import stylescustom from '../res/stylescustom';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {consvertTimeToday} from '../data/checkday';
import Loading from '../component/Loading';
import {RootState} from '../redux/store';
import {useGetAttendanceSumaryQuery} from '../redux/api/auth.api';
import chuyenDoiNgayTiengViet from '../res/convert';
import {Image} from 'react-native';
import images from '../res/images';
import {NavigationProp} from '@react-navigation/native';
interface LocBaoCaoProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const d = new Date();

let yy = d.getFullYear();
let mm = d.getMonth() + 1;

const LocBaoCao = (props: LocBaoCaoProps) => {
  const {MD, MM} = props.route?.params?.day;
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const [page, setPage] = useState(10);
  const id = useAppSelect(data => data.infoUser?.id);

  const {data, isFetching, refetch} = useGetAttendanceSumaryQuery({
    id: id,
    page: page,
    month_number: MD - 1,
    year: MM,
  });
  const numberday = new Date(
    MM ? MM : new Date().getMonth() + 1,
    MD ? MD : new Date().getFullYear(),
    0,
  ).getDate();

  const handleEndReached = () => {
    setPage(page + 10);
    refetch();
  };

  const renderItem = useCallback(({item}: any) => {
    let b = new Date(item.in_date).getDay();
    return (
      <View style={styles.item1}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 1}}
          colors={['#12449a', '#045ec5']}
          style={styles.ln}>
          <Text style={styles.txt5}>
            {chuyenDoiNgayTiengViet(b)}, {item.in_date}
          </Text>
          {item.behavior == 'early' ? (
            <Text style={[styles.txt6, {color: '#1dec2c'}]}>Đi đúng giờ</Text>
          ) : item.behavior == 'late' ? (
            <Text style={[styles.txt6, {color: 'orange'}]}>Đi muộn</Text>
          ) : null}
        </LinearGradient>

        <View style={styles.item}>
          <View style={styles.item2}>
            <Text style={styles.txt1}>Số công</Text>
          </View>
          <Text style={styles.txt2}>{1}</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.item2}>
            <Text style={styles.txt1}>Thời gian checkin</Text>
          </View>
          <Text style={styles.txt2}>{consvertTimeToday(item?.details[0]?.in_time)}</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.item2}>
            <Text style={styles.txt1}>Thời gian check out</Text>
          </View>
          <Text style={styles.txt2}>{consvertTimeToday(item?.details[0]?.out_time)}</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.item2}>
            <Text style={styles.txt1}>Thời gian đi muộn, về sớm</Text>
          </View>
          <Text style={styles.txt2}>{item?.dimuonvesom}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={
          'LỌC BÁO CÁO (' + 1 + '/' + MD + '/' + MM + '-' + numberday + '/' + MD + '/' + MM + ')'
        }
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        {data?.data.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.data}
            keyExtractor={(item: getAttendanceSumary) => `${item.id}`}
            renderItem={renderItem}
            style={{width: sizes.width}}
            onEndReachedThreshold={0.7}
            onEndReached={handleEndReached}
            removeClippedSubviews={true}
            initialNumToRender={7}
          />
        ) : (
          <View style={{flex: 1}}>
            <Image source={images.notData} style={styles.img} />
            <Text style={styles.txt}>Không có dữ liệu chấm công</Text>
          </View>
        )}
      </View>
      {isFetching && <Loading />}
    </View>
  );
};

export default LocBaoCao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: 'center',
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
    marginLeft: 15,
  },
  txt6: {
    fontSize: sizes._font_size_big,
    color: colors.colorWhite,
    fontFamily: fonts.textRegular,
    marginRight: 10,
  },
  ln: {
    height: 50,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: sizes.width * 0.5,
    width: sizes.width * 0.5,
    marginTop: sizes._csreen_height * 0.1,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
