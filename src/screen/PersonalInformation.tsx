import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Header from '../component/Header';
import images from '../res/images';
import sizes from '../res/sizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import colors from '../res/color';
import stylescustom from '../res/stylescustom';
import BuntomCustom1 from '../component/BuntomCustom1';
import fonts from '../res/fonts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  useChangUserSettingMutation,
  useEmployeeQuery,
  useUploadImageMutation,
} from '../redux/api/auth.api';
import {Gender} from '../res/convert';
import {fullday1} from '../data/checkday';
import Loading from '../component/Loading';
import Modalselect from '../component/modal/Modalselect';
import {dataSex} from '../data/itemnhanvien/gioitinh';
import ModalDelete from '../component/modal/ModalDelete';
import {RootState} from '../redux/store';
import {Alert} from 'react-native';
import axios from 'axios';
import URI from '../URI';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const PersonalInformation = (props: Props) => {
  const formData = new FormData();
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const info: any = useAppSelect(data => data?.infoUser);
  const {data, isLoading, refetch} = useEmployeeQuery(`${info?.id}`);
  const [sex, setSex] = useState<Select>();
  const [upload] = useUploadImageMutation();
  const UpLoadImage = async () => {
    const images = await ImagePicker.openPicker({
      width: sizes._100sdp,
      height: sizes._100sdp,
      multiple: false,
      compressImageQuality: 0.8,
      includeBase64: true,
    });
    const item = {
      uri: images.path,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    try {
      formData.append('profile_picture', item);
      await upload(formData).unwrap();
      refetch();

      Alert.alert('Cập nhật thành công');
    } catch (error) {
      console.log(error);

      Alert.alert('Cập nhật thất bại');
    }
  };
  const [showngaysinh, setShowngaysinh] = useState(false);
  const [showmodalsex, setShowmodalsex] = useState(false);
  const [phone_number, setPhone_number] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [about_me, setAbout_me] = useState<string | undefined>();
  const [ngaysinh, setNgaySinh] = useState<string | undefined>();
  const [thanhcong, setthanhcong] = React.useState('');
  const [showthanhcong, setShowthanhcong] = React.useState(false);
  useEffect(() => {
    setSex({name: data?.profile?.gender});
    setNgaySinh(data?.profile?.date_of_birth ? fullday1(data?.profile?.date_of_birth) : '');
    setPhone_number(data?.profile?.phone_number);
    setAbout_me(data?.profile?.about_me);
    setAddress(data?.profile?.address);
  }, [data]);
  const timeoutIdRef: any = React.useRef();
  const [change, {isLoading: loading}] = useChangUserSettingMutation();
  const update = async () => {
    try {
      const changes = await change({
        first_name: data?.first_name,
        email: info.email,
        about_me: about_me,
        address: address,
        gender: sex?.name,
        date_of_birth: ngaysinh,
        phone_number: phone_number,
      }).unwrap();
      refetch();
      setShowthanhcong(true);
      setthanhcong(changes?.message);
      timeoutIdRef.current = setTimeout(() => {
        setShowthanhcong(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title
        back
        onBackPress={() => props.navigation.goBack()}
        textTittle={'Thông tin cá nhân'}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView
          style={{flex: 1, width: sizes._screen_width}}
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets>
          <View style={{alignItems: 'center', marginTop: sizes._40sdp}}>
            <Image
              source={
                data?.profile_picture?.full_url
                  ? {uri: data?.profile_picture?.full_url}
                  : images.iconuser1
              }
              style={styles.img}
            />
          </View>
          <TouchableOpacity style={styles.view} onPress={UpLoadImage}>
            <Icon name="camera" size={40} color={colors.colorText} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtname}>{data?.full_name}</Text>
            <Text style={{color: colors.colorText, fontFamily: fonts.textRegular}}>
              {data?.email}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.information} onPress={() => setShowmodalsex(true)}>
              <Icon name="intersex" size={25} color={'#3366FF'} style={styles.icon} />
              <View style={styles.item}>
                <Text style={styles.text}>{Gender(sex?.name)}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.information}>
              <Icon name="phone" size={25} color={'#3366FF'} style={styles.icon} />
              <View style={styles.item}>
                <TextInput
                  value={phone_number}
                  onChangeText={setPhone_number}
                  style={styles.txtinput}
                  maxLength={10}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.information} onPress={() => setShowngaysinh(true)}>
              <Icon name="birthday-cake" size={25} color={'#3366FF'} style={styles.icon} />
              <View style={styles.item}>
                <Text style={styles.text}>{ngaysinh}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.information}>
              <Icon name="adjust" size={25} color={'#3366FF'} style={styles.icon} />
              <View style={styles.item}>
                <TextInput value={about_me} onChangeText={setAbout_me} style={styles.txtinput} />
              </View>
            </View>
            <View style={styles.information}>
              <Icon name="map-marker" size={25} color={'#3366FF'} style={styles.icon} />
              <View style={styles.item}>
                <TextInput value={address} onChangeText={setAddress} style={styles.txtinput} />
              </View>
            </View>
          </View>

          <View style={styles.btn}>
            <BuntomCustom1 text="Thay đổi" onpress={update} />
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={showngaysinh}
        is24Hour={true}
        mode="date"
        onConfirm={(date: any) => {
          setNgaySinh(fullday1(date));
          setShowngaysinh(false);
        }}
        onCancel={() => setShowngaysinh(false)}
      />
      <Modalselect
        isShow={showmodalsex}
        item={dataSex}
        name="Giới tính"
        toggleDate={() => setShowmodalsex(false)}
        select={setSex}
      />
      <ModalDelete isShow={showthanhcong} val={thanhcong} />
      {(isLoading || loading) && <Loading />}
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.colorWhite,
  },
  txtname: {
    color: colors.colorText,
    fontSize: sizes._font_size_maxs,
    fontFamily: fonts.textBold,
  },
  img: {
    height: sizes._100sdp,
    width: sizes._100sdp,
    borderRadius: sizes._50sdp,
  },
  information: {
    height: sizes._50sdp,
    width: '90%',
    backgroundColor: '#e8e9ec9e',
    borderRadius: sizes._10sdp,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: sizes._20sdp,
  },

  text: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  icon: {
    marginLeft: sizes._15sdp,
  },
  item: {
    alignItems: 'center',
    height: sizes._50sdp,
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
  },
  btn: {width: '75%', alignSelf: 'center', marginTop: sizes._30sdp, marginBottom: 10},
  txtinput: {
    height: '100%',
    width: '80%',
    textAlign: 'center',
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  view: {alignItems: 'center', marginTop: sizes._20sdp},
});
