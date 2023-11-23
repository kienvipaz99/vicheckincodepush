import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable} from 'react-native';
import BuntomCustom1 from '../../component/BuntomCustom1';
import Header from '../../component/Header';
import TextInputCustoms from '../../component/TextInputCustoms';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
interface XinGapKhachProps {
  navigation: NavigationProp<Record<string, any>>;
  route: {params: LeaveTypeCustom};
}
const DonGapKhachHang = (props: XinGapKhachProps) => {
  const [noidung, setNoiDung] = useState('');
  const {day, starttime, endtime, name, numberphone, diachi} = props?.route?.params;
  const [image, setImage] = useState('');
  const UploadImg = async () => {
    try {
      const img = await ImageCropPicker.openCamera({
        cropping: false,
        height: sizes._csreen_height,
        width: sizes._csreen_width,
      });
      setImage(img?.path);
      console.log(img?.path);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'XIN ĐI GẶP KHÁCH HÀNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: sizes._screen_width}}>
          <View style={styles.view}>
            <Text style={styles.txt}>Ngày xin nghỉ:</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt1}>{day}</Text>
              <Image source={images.calendar} style={{marginRight: 8}} />
            </TouchableOpacity>

            <View style={styles.item}>
              <View style={{width: sizes.width * 0.4}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Thời gian từ:</Text>
                <TouchableOpacity style={styles.btn1}>
                  <Text style={styles.txt1}>{starttime}</Text>
                  <Image source={images.clock1} style={{marginRight: 8, height: 26, width: 26}} />
                </TouchableOpacity>
              </View>

              <View style={{width: sizes.width * 0.4}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Đến:</Text>
                <TouchableOpacity style={styles.btn1}>
                  <Text style={styles.txt1}>{endtime}</Text>
                  <Image source={images.clock1} style={{marginRight: 8, height: 26, width: 26}} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.txt, {marginTop: 20}]}>Thông tin thêm:</Text>
            <TextInputCustoms
              img={images.iconuser}
              value={name}
              setValue={() => {}}
              editable={false}
            />

            <TextInputCustoms
              img={images.phone}
              value={numberphone}
              setValue={() => {}}
              editable={false}
            />

            <TextInputCustoms
              img={images.map}
              placeholder="Địa chỉ"
              value={diachi}
              setValue={() => {}}
              editable={false}
            />
            <TextInputCustoms
              type
              img={images.note}
              placeholder="Nội dung"
              value={noidung}
              setValue={setNoiDung}
            />
          </View>
          <Text style={styles.txt2}>Check in ảnh</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Pressable onPress={UploadImg}>
              <Image source={images.cameras} style={{marginLeft: 20}} />
            </Pressable>
            {image && (
              <Image
                source={{uri: image}}
                style={{height: 70, width: 70, marginLeft: 10, borderRadius: 10}}
              />
            )}
          </View>
          <View style={styles.btn3}>
            <BuntomCustom1 text="Gửi" onpress={() => {}} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DonGapKhachHang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
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
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn1: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  btn2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    height: 21,
    width: 17,
    tintColor: '#959595',
    marginLeft: sizes._10sdp,
  },
  texinput: {
    width: '90%',
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  view: {
    width: '90%',
    marginTop: sizes._20sdp,
    marginBottom: 5,
    alignSelf: 'center',
  },
  btn3: {
    width: sizes.width * 0.7,
    marginTop: sizes._25sdp,
    alignSelf: 'center',
    marginBottom: 50,
  },
  txt2: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.05,
    marginLeft: 20,
    marginTop: 10,
  },
});
