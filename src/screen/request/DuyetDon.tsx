import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../../component/Header';
import sizes from '../../res/sizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import {checknumberdayval} from '../../data/checkday';
import {NavigationProp, Route} from '@react-navigation/native';
import {HouseMinute, colorStatus, getLeaveType1} from '../../res/convert';
import {useFeedbackRequestMutation, useLogRequestQuery} from '../../redux/api/auth.api';
import {Alert} from 'react-native';
import Loading from '../../component/Loading';
interface Props {
  navigation: NavigationProp<Route<string>>;
  route: {
    params: {
      item: LeaveReQuest;
      yeucau: string;
      type: string;
    };
  };
}
export default function DuyetDon(props: Props) {
  const {item, yeucau, type} = props.route?.params;
  const [note, setNote] = useState('');
  const [Changtatus, {isLoading}] = useFeedbackRequestMutation();
  const {data, isLoading: isLoadingLog} = useLogRequestQuery({
    id: item?.id,
  });
  const upload = async (status: string) => {
    try {
      await Changtatus({
        id: item?.id,
        data: {
          id: item?.id,
          bypassed: false,
          note: note,
          status_name: status,
        },
        status: status,
      }).unwrap();
      Alert.alert(
        'Thông báo',
        'Nghỉ phép đã được cập nhật thành công.',
        [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log(error);

      Alert.alert('Đã xảy ra lỗi xin vui lòng thử lại sau');
    }
  };
  console.log(item);

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Xin nghỉ phép'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: sizes.width, flex: 1}}>
          <View style={styles.view}>
            <View style={stylescustom.row2}>
              <Text style={styles.txttt}>Thông tin nghỉ phép:</Text>
              <Text style={styles.txttt}>{item?.type?.name}</Text>
            </View>
            <View style={[stylescustom.row2, styles.item1, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Icon name="user" size={20} color={colors.colorIcon} style={{marginLeft: 10}} />
                <Text style={styles.txt1}>Tên nhân viên</Text>
              </View>
              <Text style={styles.txt}>{data?.user?.full_name}</Text>
            </View>

            <View style={[stylescustom.row2, styles.item, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Ionicons
                  name="people-sharp"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 10}}
                />
                <Text style={styles.txt1}>Phòng ban</Text>
              </View>
              <Text style={styles.txt}>{data?.user?.department?.name}</Text>
            </View>
            <View style={[stylescustom.row2, styles.item, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Ionicons
                  name="calendar-sharp"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 10}}
                />
                <Text style={styles.txt1}>Ngày gửi</Text>
              </View>
              <Text style={styles.txt}>{checknumberdayval(item?.created_at)}</Text>
            </View>
            <Text style={[styles.txttt, {marginTop: 20}]}>Nội dung:</Text>
            <View style={[stylescustom.row2, styles.item1, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Ionicons
                  name="calendar-sharp"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 12}}
                />
                <Text style={styles.txt1}>Ngày nghỉ</Text>
              </View>
              <Text style={styles.txt}>
                {getLeaveType1(item?.duration_type) === 'Nghỉ nhiều ngày'
                  ? `${checknumberdayval(item?.start_at)}-${checknumberdayval(item?.end_at)}`
                  : checknumberdayval(item?.start_at)}
              </Text>
            </View>
            <View style={[stylescustom.row2, styles.item, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Feather name="clock" size={20} color={colors.colorIcon} style={{marginLeft: 10}} />
                <Text style={styles.txt1}>Thời gian nghỉ</Text>
              </View>
              <View>
                <Text style={styles.txt12}>Bắt đầu: {HouseMinute(item?.start_at)}</Text>
                <Text style={styles.txt12}>Kết thúc: {HouseMinute(item?.end_at)}</Text>
              </View>
            </View>
            {item?.type?.name === 'Đơn đi gặp đối tác' && (
              <View style={[styles.item4, stylescustom.shadowitem]}>
                <View style={stylescustom.row1}>
                  <Feather
                    name="map-pin"
                    size={20}
                    color={colors.colorIcon}
                    style={{marginLeft: 12}}
                  />
                  <Text style={styles.txt1}>Địa chỉ</Text>
                </View>
                <View style={styles.view1}>
                  <Text style={styles.txt12}>{item?.location}</Text>
                </View>
              </View>
            )}
            <View style={[styles.item4, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Foundation
                  name="clipboard-notes"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 12}}
                />
                <Text style={styles.txt1}>Lý do</Text>
              </View>
              <View style={styles.view1}>
                <Text style={styles.txt12}>{item?.comments[0]?.comment}</Text>
              </View>
            </View>
            <View style={[styles.item4, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Icon name="user" size={20} color={colors.colorIcon} style={{marginLeft: 12}} />
                <Text style={styles.txt1}>Người duyệt</Text>
              </View>
              <View style={styles.view1}>
                <Text style={styles.txt12}>{data?.reviews[0]?.reviewed_by?.full_name}</Text>
              </View>
            </View>
            <View style={[styles.item4, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Foundation
                  name="clipboard-notes"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 12}}
                />
                <Text style={styles.txt1}>Trạng thái đơn</Text>
              </View>
              <View style={styles.view1}>
                <Text style={[styles.txt12, {color: colorStatus(data?.status?.translated_name)}]}>
                  {data?.status?.translated_name}
                </Text>
              </View>
            </View>
            <View style={[styles.item4, stylescustom.shadowitem]}>
              <View style={stylescustom.row1}>
                <Foundation
                  name="clipboard-notes"
                  size={20}
                  color={colors.colorIcon}
                  style={{marginLeft: 12}}
                />
                <Text style={styles.txt1}>Ghi chú</Text>
              </View>
              <View style={styles.view1}>
                <Text style={styles.txt12}>{data?.reviews[0]?.comments[0]?.comment}</Text>
              </View>
            </View>
            {yeucau == 'Yêu cầu' && (
              <TextInput
                placeholder="Thêm ghi chú"
                style={styles.note}
                numberOfLines={5}
                value={note}
                onChangeText={setNote}
                multiline
                cursorColor={'black'}
                selectionColor={'black'}
              />
            )}
          </View>
        </ScrollView>
        {yeucau == 'Yêu cầu' && (
          <View style={[stylescustom.shadowitem, styles.item2]}>
            <View style={[styles.item3]}>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: '#5BBD2B'}]}
                onPress={() => upload('approved')}>
                <Text style={styles.txt2}>Chấp thuận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: colors.colorIcon}]}
                onPress={() => upload('rejected')}>
                <Text style={styles.txt2}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {(isLoading || isLoadingLog) && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    marginRight: 10,
    fontSize: sizes.width * 0.04,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
  },
  txt12: {
    marginRight: 10,
    fontSize: sizes.width * 0.04,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
  },
  item: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 50,
    borderRadius: sizes._10sdp,
  },
  item4: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: sizes._10sdp,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  item1: {
    marginTop: 15,
    backgroundColor: 'white',
    height: 50,
    borderRadius: sizes._10sdp,
  },
  txt1: {
    marginLeft: 10,
    fontSize: sizes.width * 0.04,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
  txttt: {
    color: colors.colorText,
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.textRegular,
  },
  item2: {
    width: sizes.width,
    backgroundColor: 'white',
    position: 'absolute',

    bottom: 0,
  },
  item3: {
    height: 60,
    width: sizes.width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btn: {
    height: 45,
    width: sizes.width * 0.4,
    backgroundColor: 'red',
    borderRadius: (sizes.width * 0.4) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txt2: {
    color: 'white',
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  view: {
    width: sizes.width * 0.9,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 100,
  },
  note: {
    width: sizes.width * 0.9,
    backgroundColor: 'white',
    ...stylescustom.shadowitem,
    height: 120,
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
    fontSize: sizes.width * 0.04,
  },
  view1: {width: '60%', alignItems: 'flex-end'},
});
