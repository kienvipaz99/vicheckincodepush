import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import Header from '../../component/Header';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputCustoms from '../../component/TextInputCustoms';
import {NavigationProp} from '@react-navigation/native';
import {colorStatus, getLeaveType1} from '../../res/convert';
import {chuyenDoiThoiGian, fullday} from '../../data/checkday';
import {
  useCommentRequestMutation,
  useFeedbackRequestMutation,
  useLogRequestQuery,
} from '../../redux/api/auth.api';
import ButonCustom from '../../component/ButonCustom';
import Loading from '../../component/Loading';
interface XinNghiPhepProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const DonXinNghiPhep = (props: XinNghiPhepProps) => {
  const {start_at, end_at, type, duration_type, comments, id, location} = props.route?.params?.item
    ?.item as LeaveReQuest;
  let status = props.route?.params?.item?.status;

  const [noiDung, setNoiDung] = useState(comments?.[0]?.comment);
  const loaiNghiPhep = getLeaveType1(duration_type);
  const [EditComment, {isLoading}] = useCommentRequestMutation();
  const [CancleRequest, {isLoading: LoadingCancle}] = useFeedbackRequestMutation();
  const {data, isLoading: LoadingLog} = useLogRequestQuery({
    id: id,
  });
  const Comment = async () => {
    try {
      await EditComment({
        id: comments?.[0]?.id,
        data: {
          description: noiDung,
        },
      }).unwrap();
      Alert.alert('Nội dung đã được gửi');
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi');
    }
  };

  const cancel = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn huỷ đơn.',
      [
        {
          text: 'OK',
          onPress: async () => {
            await CancleRequest({
              id: id,
              data: {
                id: id,
                bypassed: false,
                note: noiDung,
                status_name: 'canceled',
              },
              status: 'canceled',
            }).unwrap();
            props.navigation.goBack();
          },
        },
        {text: 'Huỷ', onPress: () => {}},
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'XIN NGHỈ PHÉP'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={styles.scoll} showsVerticalScrollIndicator={false}>
          <View style={styles.item}>
            <Text style={styles.txt}>Thông tin nghỉ phép:</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt1}>{loaiNghiPhep}</Text>
              <Image source={images.nghiphep} style={{height: 35, width: 35, marginRight: 2}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt1}>{type?.name}</Text>
              <Icon name="grav" size={30} color={colors.colorText} style={{marginRight: 8}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt1}>{fullday(start_at)}</Text>
              <Image source={images.calendar} style={{marginRight: 8}} />
            </TouchableOpacity>

            {loaiNghiPhep === 'Nghỉ nhiều ngày' && (
              <>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.txt1}>{fullday(end_at)}</Text>
                  <Image source={images.calendar} style={{marginRight: 8}} />
                </TouchableOpacity>
              </>
            )}
            {loaiNghiPhep == 'Nghỉ theo giờ' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={[styles.btn, {width: sizes.width * 0.4}]}>
                  <Text style={styles.txt1}>{chuyenDoiThoiGian(start_at)}</Text>
                  <Image source={images.clock1} style={{marginRight: 8}} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {width: sizes.width * 0.4}]}>
                  <Text style={styles.txt1}>{chuyenDoiThoiGian(end_at)}</Text>
                  <Image source={images.clock1} style={{marginRight: 8}} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{alignSelf: 'center', marginTop: 30}}>
              {status === 'Chưa duyệt' && (
                <View style={{marginTop: sizes._50sdp}}>
                  <Text style={styles.txt}>Nội dung:</Text>
                  <TextInputCustoms
                    type={true}
                    img={images.note}
                    placeholder="Nội dung"
                    value={noiDung}
                    setValue={setNoiDung}
                    editable={status === 'Chưa duyệt' ? true : false}
                  />
                </View>
              )}
              <View style={{alignItems: 'center'}}>
                {status === 'Chưa duyệt' && (
                  <View style={{marginBottom: 20, marginTop: 20}}>
                    <ButonCustom
                      Textbtn="Huỷ đơn"
                      Opress={cancel}
                      color={'white'}
                      loading={LoadingCancle}
                    />
                  </View>
                )}

                {status === 'Chưa duyệt' && (
                  <ButonCustom Textbtn="Gửi" Opress={Comment} color={'white'} loading={isLoading} />
                )}
              </View>
              {status !== 'Chưa duyệt' && (
                <View
                  style={{
                    width: sizes.width * 0.9,
                    backgroundColor: colors.colorTxtIput,
                    padding: 10,
                    borderRadius: 20,
                  }}>
                  <Text style={styles.txt}>Nhật ký phản hồi:</Text>
                  <View style={{marginTop: 20}}>
                    <Text style={styles.txt}>Nội dung yêu cầu:</Text>
                    <View>
                      {data?.comments?.map(item => (
                        <Text key={item?.id} style={styles.txt1}>
                          {item?.comment}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View style={{marginTop: 20}}>
                    <View style={styles.view}>
                      <Text style={styles.txt}>{data?.reviews[0]?.reviewed_by?.full_name}</Text>
                      <Text
                        style={[
                          styles.txt,
                          {color: colorStatus(data?.reviews[0]?.status?.translated_name)},
                        ]}>
                        {data?.reviews[0]?.status?.translated_name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                      <Text style={styles.txt}>Phản hồi: </Text>
                      <View>
                        {data?.reviews[0]?.comments?.map(item => (
                          <Text key={item?.id} style={styles.txt1}>
                            {item?.comment}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {LoadingLog && <Loading />}
    </View>
  );
};

export default DonXinNghiPhep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  btn: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  item: {
    width: '90%',
    marginTop: sizes._20sdp,
    marginBottom: 5,
    alignSelf: 'center',
  },
  scoll: {flex: 1, height: '100%', width: '100%'},
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
