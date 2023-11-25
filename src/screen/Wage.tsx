import {StyleSheet, Text, TouchableOpacity, View, Platform, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../component/Header';
import sizes from '../res/sizes';
import colors from '../res/color';
import luong from '../data/luong';
import stylescustom from '../res/stylescustom';
import fonts from '../res/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useEmployeeQuery} from '../redux/api/auth.api';
import {money} from '../res/convert';
import {NavigationProp} from '@react-navigation/native';
let today = new Date();
let mm: any = String(today.getMonth() + 1).padStart(2, '0');
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}

export default function Wage(props: Props) {
  const RenderView = () => {
    const [show, setShow] = React.useState(false);
    const [thangs, setThangs] = React.useState('Tháng ' + mm);
    const [month, setMonth] = React.useState(luong[mm - 1]);
    const useAppSelect: TypedUseSelectorHook<any> = useSelector;
    const info: any = useAppSelect(data => data.infoUser);
    const checkpass = () => {
      setShow(!show);
    };

    const {data} = useEmployeeQuery(`${info?.id}`);

    return (
      <>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtname}>{data?.full_name}</Text>
            {show === true ? (
              <Icons
                name="eye"
                color={colors.colorText}
                size={20}
                onPress={checkpass}
                style={{marginLeft: sizes._12sdp}}
              />
            ) : (
              <Icons
                name="eye-slash"
                color={colors.colorText}
                size={20}
                onPress={checkpass}
                style={{marginLeft: sizes._12sdp}}
              />
            )}
          </View>
          <TouchableOpacity style={styles.selectmont}>
            <Text style={styles.txtmont}>{thangs}</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          style={styles.item1}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 1}}
          colors={['#5ad485', '#3ec58d']}>
          <Text style={styles.txt}>Lương tạm tính</Text>
        </LinearGradient>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Lương cơ bản</Text>
            {show ? (
              <Text style={styles.txt1}>{money(data?.salary?.amount)}</Text>
            ) : (
              <Text style={styles.txt1}>*** đ</Text>
            )}
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Thuế</Text>
            {show ? (
              <Text style={styles.txt1}>{money(0)}</Text>
            ) : (
              <Text style={styles.txt1}>*** đ</Text>
            )}
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Số công</Text>

            <Text style={styles.txt1}>{month?.socong}</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Mức lương</Text>

            <Text style={styles.txt1}>{0}%</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Thưởng doanh số</Text>
            {show ? (
              <Text style={styles.txt1}>{money(0)}</Text>
            ) : (
              <Text style={styles.txt1}>*** đ</Text>
            )}
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Khấu trừ bảo hiểm</Text>
            {show ? (
              <Text style={styles.txt1}>{money(0)}</Text>
            ) : (
              <Text style={styles.txt1}>*** đ</Text>
            )}
          </View>
          <View style={styles.item2}>
            <Text style={styles.txt2}>Tổng lương</Text>
            {show ? (
              <Text style={styles.txt1}>{money(0)}</Text>
            ) : (
              <Text style={styles.txt1}>*** đ</Text>
            )}
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Header title textTittle={'BẢNG LƯƠNG '} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <FlatList
          data={[]}
          renderItem={null}
          ListEmptyComponent={RenderView}
          style={{width: sizes._screen_width}}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txtname: {
    fontSize: sizes._font_size_big_big,
    color: 'black',
    marginLeft: sizes._15sdp,
    fontFamily: fonts.textRegular,
  },
  selectmont: {
    marginRight: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtmont: {
    fontSize: sizes._font_size_big_big,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: sizes._screen_height * 0.07,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 5,

    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  txt: {
    color: 'white',
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  item1: {
    height: sizes._40sdp,
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: sizes._20sdp,
    marginLeft: sizes._15sdp,
  },
  item2: {
    height: sizes._50sdp,
    borderRadius: 10,
    borderColor: colors.colorblack,

    width: sizes._screen_width * 0.9,
    marginTop: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt1: {
    marginRight: sizes._15sdp,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
  txt2: {
    left: sizes._15sdp,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
});
