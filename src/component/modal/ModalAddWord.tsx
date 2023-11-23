import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import sizes from '../../res/sizes';

import ButonCustom from '../ButonCustom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  day: any;
}
const ModalAddWord = (props: Props) => {
  const [title, setTitle] = useState('');
  const [noidung, setNoidung] = useState('');
  const [time, setTime] = useState<any>(new Date());
  const [timed, setTimed] = useState<any>('');

  const [open, setOpen] = useState(false);

  const renderContent = () => (
    <>
      <View style={styles.content}>
        <Text
          style={{
            marginTop: 30,
            color: 'black',
            fontSize: sizes._font_size_maxs,
          }}>
          Thêm công việc
        </Text>

        <View
          style={{
            marginTop: sizes._35sdp,
            marginBottom: sizes._35sdp,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{right: '30%'}}>
            <Text style={{fontSize: sizes._font_size_max_max, color: 'black'}}>{props.day}</Text>
          </View>
          <View
            style={{
              height: sizes._50sdp,
              width: '95%',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <TextInput
              value={title}
              onChangeText={val => setTitle(val)}
              placeholder="Nhập tiêu đề công việc"
            />
          </View>
          <View
            style={{
              height: sizes._50sdp,
              width: '95%',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
              marginTop: sizes._35sdp,
            }}>
            <TextInput
              value={title}
              onChangeText={val => setTitle(val)}
              placeholder="Nhập nội dung công việc"
            />
          </View>

          <DateTimePickerModal
            is24Hour={true}
            isVisible={open}
            mode="time"
            onConfirm={(date: any) => {
              let a = new Date(date).getHours();
              let b = new Date(date).getMinutes();

              setTimed(a + ':' + b);

              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginLeft: sizes._20sdp,
            alignItems: 'center',
          }}>
          <Icon name="clockcircle" size={30} color={'black'} />
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              height: sizes._40sdp,
              backgroundColor: '#C0C0C0',
              borderRadius: 10,
              justifyContent: 'center',
              width: sizes._70sdp,
              alignItems: 'center',
              marginLeft: sizes._20sdp,
            }}>
            {timed === '' ? (
              <Text style={styles.text}>--Chọn--</Text>
            ) : (
              <Text style={styles.text}>{timed}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{width: '95%', marginTop: sizes._25sdp, marginBottom: 20}}>
          <ButonCustom Textbtn="Xác nhận" Opress={() => {}} />
        </View>
      </View>
    </>
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
export default ModalAddWord;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._20sdp,
    position: 'absolute',
    height: 500,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
  },
});
