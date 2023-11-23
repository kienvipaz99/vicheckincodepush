import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import sizes from '../../res/sizes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';

interface Props {
  isShow: boolean;
  toggleDate: () => void;
  select: any;
  item: any;
  name: string;
}
const ModalVeSom = (props: Props) => {
  const [check, setCheck] = useState();
  const renderitem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.item1}
        onPress={() => {
          setCheck(item?.id);
          props.toggleDate();
          props.select({
            id: item?.id,
            name: item?.name,
          });
        }}>
        <MaterialCommunityIcons
          style={{marginLeft: 15}}
          size={25}
          name={check === item?.id ? 'check-circle' : 'check-circle-outline'}
          color={check === item?.id ? 'red' : colors.colorDargrey}
        />
        <Text
          style={{
            marginLeft: sizes._40sdp,
            color: 'black',
            fontFamily: fonts.textRegular,
            fontSize: sizes._font_size_big_big_large,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => (
    <View style={styles.content}>
      <View
        style={{
          width: '100%',
          padding: 10,
          top: 0,
          backgroundColor: '#11459d',
          borderTopLeftRadius: sizes._20sdp,
          borderTopRightRadius: sizes._20sdp,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: sizes._font_size_big_big,
            fontFamily: fonts.textBold,
          }}>
          {props.name}
        </Text>
      </View>

      <View style={styles.item}>
        {props.item?.length === 0 ? (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Image source={images.notData} style={{height: 200, width: 200}} />
            <Text
              style={{
                marginTop: 20,
                fontFamily: fonts.textRegular,
                color: 'black',
              }}>
              Không có dữ liệu{' '}
            </Text>
          </View>
        ) : (
          <FlatList
            data={props.item}
            renderItem={renderitem}
            style={{
              height: 400,
              width: '100%',
              marginTop: 10,
              marginBottom: 15,
            }}
          />
        )}
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
export default ModalVeSom;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes._screen_width * 0.8,
    backgroundColor: '#FFFFFF',
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
  item: {
    width: '100%',
    marginBottom: sizes._30sdp,
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    width: '90%',
    marginTop: sizes._15sdp,
    borderRadius: sizes._10sdp,
    alignSelf: 'center',
    height: 40,
  },
});
