import {FlatList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
interface Props {
  data?: LeaveReQuest[];
  status: any;
  color: string;
  navigation: NavigationProp<Record<string, any>>;
  yeucau?: boolean;
}
import images from '../../res/images';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import stylescustom from '../../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';
import {colorStatus, getLeaveType1} from '../../res/convert';
import {checknumberdayval} from '../../data/checkday';
export default function WaitForApprival(props: Props) {
  const renderItem = ({item, index}: {item: LeaveReQuest; index: number}) => {
    return (
      <TouchableOpacity
        style={[styles.item, stylescustom.shadowitem]}
        onPress={() =>
          props.navigation.navigate('DuyetDon', {
            item: item,
            yeucau: props.status,
            type: getLeaveType1(item?.duration_type) || '',
          })
        }>
        <View style={styles.item2}>
          <View style={styles.view1}>
            <Text style={styles.txt}>{index + 1}.</Text>
            <Text style={styles.txt1}>Xin nghỉ phép</Text>
          </View>
          <Text style={[styles.txt1, {color: colorStatus(item?.status?.translated_name)}]}>
            {props.status}
          </Text>
        </View>
        <View style={{marginLeft: sizes.width * 0.05}}>
          <View style={styles.view2}>
            <Text style={styles.txt4}>Loại phép:</Text>
            <Text style={styles.txt5}>{getLeaveType1(item?.duration_type)}</Text>
          </View>
          <View style={styles.view2}>
            <Text style={styles.txt4}>Ngày nghỉ</Text>
            <Text style={styles.txt5}>
              {getLeaveType1(item?.duration_type) === 'Nghỉ nhiều ngày'
                ? `${checknumberdayval(item?.start_at)}-${checknumberdayval(item?.end_at)}`
                : checknumberdayval(item?.start_at)}
            </Text>
          </View>
          <View style={styles.view2}>
            <Text style={styles.txt4}>Phép</Text>
            <Text style={styles.txt5}>{item?.type?.name}</Text>
          </View>
          <View style={styles.view2}>
            <Text style={styles.txt4}>Người gửi</Text>
            <Text style={styles.txt3}>{item?.user?.full_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      {props?.data?.length == 0 ? (
        <View style={styles.view}>
          <Image source={images.notData} style={styles.img} />
          <Text style={styles.txt6}>Chưa có đơn xin phép nào</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            style={{marginTop: 20}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={props.data}
            renderItem={renderItem}
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
    marginBottom: sizes._10sdp,
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
    width: '45%',
  },
  txt5: {
    fontSize: sizes.width * 0.04,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  view1: {flexDirection: 'row', alignItems: 'center'},
  view2: {
    ...stylescustom.row1,
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
});
