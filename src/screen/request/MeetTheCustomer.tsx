import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import sizes from '../../res/sizes';
interface Props {
  status: 'Chưa duyệt' | 'Đã duyệt' | 'Từ chối';
  color: string;
  navigation: NavigationProp<Record<string, any>>;
  yeucau?: boolean;
  data?: LeaveReQuest[];
  refetch: () => void;
}
import colors from '../../res/color';
import fonts from '../../res/fonts';
import stylescustom from '../../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';
import {fullday} from '../../data/checkday';
import {getLeaveType1} from '../../res/convert';
import images from '../../res/images';
export default function MeetTheCustomer(props: Props) {
  const colorText =
    props?.status == 'Chưa duyệt'
      ? colors.colorOrange
      : props.status === 'Đã duyệt'
      ? colors.colorGreen
      : 'red';
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.refetch();
    });
    return unsubscribe;
  }, [props.navigation]);
  const renderItem = ({item, index}: {item: LeaveReQuest; index: number}) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={[styles.item, stylescustom.shadowitem]}
          onPress={() =>
            props.navigation.navigate('DonXinNghiPhep', {item: {item, status: props.status}})
          }>
          <View style={styles.view1}>
            <Text style={styles.txt}>
              {index + 1}.{' '}
              {item?.type?.name === 'Đơn đi gặp đối tác' ? item?.type?.name : 'Xin nghỉ phép'}
            </Text>
            <Text style={[styles.txt7, {color: colorText}]}>{props?.status}</Text>
          </View>
          <View style={{marginLeft: sizes.width * 0.05}}>
            <View style={styles.view2}>
              <Text style={styles.txt4}>Ngày nghỉ:</Text>
              <Text style={styles.txt5}>
                {fullday(item?.start_at)}
                {item?.end_at && '-' + fullday(item?.end_at)}
              </Text>
            </View>
            <View style={styles.view2}>
              <Text style={styles.txt4}>Loại phép</Text>
              <Text style={styles.txt5}>{item?.type?.name}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={styles.txt4}>Loại:</Text>
              <Text style={styles.txt3}>{getLeaveType1(item?.duration_type)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {props?.data?.length === 0 ? (
        <View style={styles.view}>
          <Image source={images.notData} style={styles.img} />
          <Text style={styles.txt6}>Bạn không có đơn xin phép nào</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            style={{marginTop: 20}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={props?.data}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 50}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: sizes._screen_width * 0.9,
    backgroundColor: colors.colorWhite,
    borderRadius: sizes._15sdp,
    alignSelf: 'center',
    marginBottom: 10,
    padding: 5,
    marginTop: 10,
  },
  txt1: {
    fontSize: sizes.width * 0.05,
    color: '#1352ae',
    fontFamily: fonts.textRegular,
    marginLeft: sizes._5sdp,
  },
  txt: {
    fontSize: sizes.width * 0.05,
    color: '#1352ae',
    fontFamily: fonts.textRegular,
    marginLeft: sizes._10sdp,
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt2: {
    marginRight: 10,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  txt3: {
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  txt4: {
    fontSize: sizes.width * 0.04,
    color: '#9a9a9a',
    fontFamily: fonts.textRegular,
  },
  txt5: {
    fontSize: sizes.width * 0.04,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  view: {flex: 1, alignItems: 'center', marginTop: 30},
  view1: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  view2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icondelete: {
    height: 25,
    width: 25,
    marginRight: 10,
    tintColor: '#065abd',
  },
  img: {height: sizes._200sdp, width: sizes._200sdp},
  txt6: {
    fontSize: sizes.width * 0.05,
    color: colors.colorblack,
    marginTop: 25,
    fontFamily: fonts.textRegular,
  },
  txt7: {
    fontSize: sizes.width * 0.05,
    fontFamily: fonts.textRegular,
  },
});
