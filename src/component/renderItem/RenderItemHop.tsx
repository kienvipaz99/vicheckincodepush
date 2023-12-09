import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import images from '../../res/images';
import {NavigationProp} from '@react-navigation/native';
import colors from '../../res/color';
import stylescustom from '../../res/stylescustom';
import {consvertTime} from '../../data/checkday';
interface Props {
  item: RoomMeeting;
  navigation: NavigationProp<Record<string, any>>;
}
const RenderItemHop = (props: Props) => {
  const item = props.item;
  const checkTime = () => {
    let startTime = new Date(item?.day + ' ' + consvertTime(item?.time_start));
    let endTime = new Date(item?.day + ' ' + consvertTime(item?.time_end));
    let timeReal = new Date();
    if (startTime > timeReal) {
      return 'Chưa bắt đầu';
    } else if (startTime <= timeReal && timeReal <= endTime) {
      return 'Đang diễn ra';
    } else if (timeReal > endTime) {
      return 'Hoàn thành';
    }
  };
  return (
    <>
      <Text style={styles.txt}>
        {consvertTime(item?.time_start)}-{consvertTime(item?.time_end)}
      </Text>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor:
              item?.level == 'important'
                ? colors.blue1
                : item?.level == 'normal'
                ? colors.gray2
                : undefined,
          },
        ]}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('ChiTietLichHop', {item: item})}>
        <View style={styles.item1}>
          <View style={stylescustom.row2}>
            <Text style={styles.txt1}>{item?.title}</Text>
            <View style={stylescustom.row1}>
              <Text
                style={[
                  styles.txt,
                  {
                    color:
                      checkTime() == 'Chưa bắt đầu'
                        ? colors.colorBlue
                        : checkTime() == 'Hoàn thành'
                        ? '#CC5F00'
                        : checkTime() == 'Đang diễn ra'
                        ? 'red'
                        : undefined,
                  },
                ]}>
                {checkTime()}
              </Text>
              <Image
                source={item?.status === 'done' ? images.check1 : undefined}
                style={{marginLeft: 10}}
              />
            </View>
          </View>
          {item?.room?.name && <Text style={styles.txt}>Phòng họp: {item?.room?.name}</Text>}
          {item?.online && <Text style={styles.txt}>Trạng thái: Họp online</Text>}

          {item?.link && <Text style={styles.txt}>Link họp: {item?.link}</Text>}
          <Text style={styles.txt}>Chủ trì: {item?.host}</Text>
          <Text
            style={[
              styles.txt,
              {
                color:
                  item?.level == 'important'
                    ? '#CC5F00'
                    : item?.level == 'normal'
                    ? '#020202'
                    : undefined,
              },
            ]}>
            Mức độ:{' '}
            {item?.level == 'important'
              ? 'Quan trọng'
              : item?.level == 'normal'
              ? 'Bình thường'
              : null}
          </Text>
          <Text style={styles.txt}>
            Phạm vi:{' '}
            {item?.classify === 'custom'
              ? 'Tuỳ chọn'
              : item?.classify === 'team'
              ? 'Team'
              : 'Tất cả'}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default RenderItemHop;
const styles = StyleSheet.create({
  txt: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  item: {
    backgroundColor: colors.blue1,
    borderRadius: sizes._10sdp,
    borderBottomLeftRadius: sizes._10sdp,
    borderTopLeftRadius: sizes._10sdp,
    marginBottom: 5,
    marginTop: 10,
    width: sizes.width * 0.95,
    paddingLeft: 8,
  },
  item1: {
    backgroundColor: '#E8F8FF',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    ...stylescustom.shadowitem,
  },
  txt1: {
    color: colors.colorblack,
    fontFamily: fonts.textBold,
    fontSize: sizes.width * 0.045,
  },
});
