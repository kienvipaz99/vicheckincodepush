import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import BuntomCustom1 from '../../component/BuntomCustom1';
import sizes from '../../res/sizes';
import images from '../../res/images';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import TextInputCustoms from '../../component/TextInputCustoms';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function DonDimuonVeSom(props: Props) {
  const {day, type, starttime, endtime, noidung} = props.route?.params;
  const [noidungs, setNoiDungs] = React.useState(noidung);
  console.log(props.route?.params);

  return (
    <View style={{flex: 1}}>
      <Header
        title
        textTittle={'ĐI MUỘN VỀ SỚM'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView
          style={{
            width: sizes._screen_width,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={styles.item1}>
              <Text style={styles.txt}>Thời gian bạn đi muộn về sớm:</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt1}>{type}</Text>
                <Image source={images.note} style={{marginRight: 5, height: 24, width: 24}} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt1}>{day}</Text>
                <Image source={images.calendar} style={{marginRight: 8, width: 24, height: 24}} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={styles.btn3}>
                  <Text style={styles.txt1}>{starttime}</Text>
                  <Image source={images.clock1} style={{marginRight: 5}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn3}>
                  <Text style={styles.txt1}>{endtime}</Text>
                  <Image source={images.clock1} style={{marginRight: 5}} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.txt, {marginTop: sizes._30sdp}]}>Lý do bạn đi muộn về sớm:</Text>
              <TextInputCustoms
                type={true}
                img={images.note}
                placeholder="Nội dung"
                value={noidungs}
                setValue={setNoiDungs}
              />
            </View>
            <View style={styles.btn2}>
              <BuntomCustom1 text="Gửi" onpress={() => {}} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
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
  btn3: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.width * 0.4,
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
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 10,
  },
  btn2: {width: '75%', marginTop: sizes._25sdp},
  item1: {width: '90%', marginTop: sizes._20sdp, marginBottom: 5},
  err: {
    color: 'red',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
  },
});
