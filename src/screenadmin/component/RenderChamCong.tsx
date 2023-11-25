import React, {memo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import {
  useGetAttendanceSumaryDailyQuery,
  useGetdashBoardonWorkingQuery,
} from '../../redux/api/auth.api';
import {ActivityIndicator} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import stylescustom from '../../res/stylescustom';
import {checknumberdayval2} from '../../data/checkday';
interface Props {
  item: any;
  navigation: NavigationProp<Record<string, any>>;
}

const RenderChamCong = (props: Props) => {
  const {data} = useGetdashBoardonWorkingQuery('');
  const {data: getAttendanceSumary} = useGetAttendanceSumaryDailyQuery({
    day: checknumberdayval2(),
  });
  const disom = getAttendanceSumary?.data.filter((item: any) => {
    return item.behavior === 'early';
  });
  const dimuon = getAttendanceSumary?.data.filter((item: any) => {
    return item.behavior === 'late';
  });
  const numberaa = () => {
    if (props.item.name == 'Chưa check in') {
      return data?.notAttended?.length;
    }
    if (props.item.name == 'Đúng giờ') {
      return disom?.length;
    }
    if (props.item.name == 'Đi muộn') {
      return dimuon?.length;
    }
    if (props.item.name == 'Về sớm') {
      return data?.outEarly.length;
    }
    if (props.item.name == 'Nghỉ làm') {
      return data?.leave?.length;
    }
    if (props.item.name == 'Gặp khách hàng') {
      return [].length;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, {backgroundColor: props.item.color}]}
      onPress={() =>
        props.navigation.navigate('ThongkeCheckin', {
          number: props.item.navigation,
        })
      }>
      <View>
        <Image
          source={images.tick}
          style={{
            height: sizes._35sdp,
            width: sizes._35sdp,
            marginLeft: sizes._20sdp,
            tintColor: props.item.coloricon,
          }}
        />
      </View>
      <View style={{alignItems: 'center', width: sizes._screen_width * 0.43 * 0.7}}>
        {getAttendanceSumary && data ? (
          <Text style={styles.number}>{numberaa()}</Text>
        ) : (
          <ActivityIndicator size="large" color="#66befe" />
        )}
        <Text style={styles.name}>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RenderChamCong);

const styles = StyleSheet.create({
  container: {
    height: sizes._70sdp,
    alignItems: 'center',
    width: sizes._screen_width * 0.43,
    borderRadius: sizes._15sdp,
    flexDirection: 'row',
    marginTop: sizes._20sdp,
    ...stylescustom.shadowitem,
  },
  number: {
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.06,
    fontFamily: fonts.textBold,
  },
  name: {
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.035,
    fontFamily: fonts.textRegular,
  },
});
