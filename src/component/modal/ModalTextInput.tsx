import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import BuntomCustom1 from '../BuntomCustom1';
import colors from '../../res/color';
import {useFeedbackattendancesMutation} from '../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  title?: 'duyệt' | 'huỷ';
  id: number;
  navigation: NavigationProp<Record<string, any>>;
}
const ModalTextInput = (props: Props) => {
  const [submit, {isLoading}] = useFeedbackattendancesMutation();
  const ChangStatus = async () => {
    try {
      await submit({
        data: {
          status_name: props?.title === 'duyệt' ? 'approve' : 'reject',
        },
        id: props.id,
        status: props?.title === 'duyệt' ? 'approve' : 'reject',
      }).unwrap();
      Alert.alert(
        'Thông báo',
        `Đơn đã được cập nhật thành công`,
        [
          {
            text: 'OK',
            onPress: () => {
              props.toggleDate();
              props.navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert(error?.data?.message);
    }
  };
  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Phản hồi đơn từ'}</Text>
      </View>
      <View>
        <Text style={styles.text}>Bạn có muốn {props?.title} chấm công </Text>
      </View>
      <View style={{padding: 10, width: '80%'}}>
        <BuntomCustom1 text="Đồng ý" onpress={ChangStatus} isLoading={isLoading} />
      </View>
    </View>
  );
  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback onPress={props.toggleDate}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalTextInput;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes.width * 0.9,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._20sdp,
    position: 'absolute',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    marginTop: 20,
    marginBottom: 20,
  },
  txt: {
    width: sizes.width * 0.8,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.colorDargrey,
    marginTop: 20,
    padding: 10,
    paddingTop: 10,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
    color: colors.colorText,
  },
  header: {
    width: '100%',
    padding: 10,
    top: 0,
    backgroundColor: '#11459d',
    borderTopLeftRadius: sizes._20sdp,
    borderTopRightRadius: sizes._20sdp,
  },
  title: {
    color: 'white',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textBold,
  },
});
