import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import colors from '../../res/color';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import images from '../../res/images';
import TextInputCustoms from '../../component/TextInputCustoms';
import BuntomCustom1 from '../../component/BuntomCustom1';
import {NavigationProp} from '@react-navigation/native';
import {chuyenDoiThoiGian} from '../../data/checkday';
import ModalTextInput from '../../component/modal/ModalTextInput';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function DonQuenChamCong(props: Props) {
  const {in_date, details} = props.route?.params?.item as attendanceRequest;
  const [noidungs, setNoiDungs] = useState(details[0]?.comments[0]?.comment);
  const {duyetdon} = props.route?.params;
  const [phanhoi, setPhanhoi] = useState<'huỷ' | 'duyệt'>();
  const [show, setShow] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'QUÊN CHẤM CÔNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.txt}>Thời gian quên chấm công:</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt1}>{in_date}</Text>
              <Image source={images.note} style={styles.img} />
            </TouchableOpacity>
            <View style={stylescustom.row2}>
              <TouchableOpacity style={styles.btn2}>
                <Text style={styles.txt1}>{chuyenDoiThoiGian(details[0]?.in_time)}</Text>
                <Image source={images.clock1} style={styles.img} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn2}>
                <Text style={styles.txt1}>{chuyenDoiThoiGian(details[0]?.out_time)}</Text>
                <Image source={images.clock1} style={styles.img} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.txt, {marginTop: sizes._30sdp}]}>Lý do bạn quên chấm công:</Text>
            <TextInputCustoms
              type={true}
              img={images.note}
              placeholder="Nội dung"
              value={noidungs}
              setValue={setNoiDungs}
              editable={false}
            />

            {duyetdon && (
              <View style={styles.btn1}>
                <BuntomCustom1
                  text="Duyệt đơn"
                  onpress={() => {
                    setShow(true);
                    setPhanhoi('duyệt');
                  }}
                />
              </View>
            )}
            {duyetdon && (
              <View style={styles.btn1}>
                <BuntomCustom1
                  text="Huỷ đơn"
                  onpress={() => {
                    setShow(true);
                    setPhanhoi('huỷ');
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <ModalTextInput
        navigation={props.navigation}
        isShow={show}
        toggleDate={() => setShow(false)}
        title={phanhoi}
        id={details[0]?.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  container: {
    width: '90%',
    marginTop: sizes._20sdp,
    alignSelf: 'center',
    marginBottom: 10,
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
  btn2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.width * 0.4,
    alignSelf: 'flex-end',
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
  img: {marginRight: 5, height: 27, width: 27},
  btn1: {marginTop: sizes._20sdp, width: sizes.width * 0.75, alignSelf: 'center'},
});
