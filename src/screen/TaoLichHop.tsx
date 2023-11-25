import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import Header from '../component/Header';
import TextInputCustoms from '../component/TextInputCustoms';
import images from '../res/images';
import sizes from '../res/sizes';
import stylescustom from '../res/stylescustom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from '../res/color';
import fonts from '../res/fonts';
import Modalselect from '../component/modal/Modalselect';
import BuntomCustom1 from '../component/BuntomCustom1';
import {day, fullday, gettime, gettimes} from '../data/checkday';
import itemmucdo from '../data/itemmucdo';
import {useCreatEventMutation} from '../redux/api/auth.api';
import ModalMuntiselect from '../component/modal/ModalMuntiselect';
import ModalMuntiselectPhongBan from '../component/modal/ModalMuntiselectPhongBan';
import {NavigationProp} from '@react-navigation/native';

interface TaoLichHopProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}

const TaoLichHop = (props: TaoLichHopProps) => {
  const [creatEvent, {isLoading}] = useCreatEventMutation();
  const [tencuochop, setTenCuocHop] = useState('');
  const [timeStart, setTimeStart] = React.useState('');
  const [timeEnd, setTimeEnd] = React.useState('');
  const [mota, setMota] = React.useState('');
  const [phongban, setPhongban] = React.useState<number[]>([]);
  const [chonNgay, setChonNgay] = React.useState('Chọn ngày');
  const [showchonNgay, setShowChonNgay] = React.useState(false);
  const [opentime, setOpentime] = React.useState(false);
  const [opentime1, setOpentime1] = React.useState<any>(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const taolich = async () => {
    try {
      const creat = await creatEvent({
        name: tencuochop,
        description: mota,
        departments: phongban,
        start_date: timeStart,
        end_date: timeEnd,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'TẠO LỊCH HỌP'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.view3}>
            <Text style={styles.txt2}>Tiêu đề cuộc họp:</Text>
            <TextInputCustoms
              placeholder="Nhập tiêu đề"
              img={images.note}
              value={tencuochop}
              setValue={setTenCuocHop}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowChonNgay(true);
              }}>
              <Image source={images.calendar1} style={styles.img} />
              <Text style={styles.txt1}>{chonNgay}</Text>
            </TouchableOpacity>

            <View style={styles.item}>
              <View style={styles.view}>
                <Text style={[styles.txt, {marginTop: 20}]}>Thời gian từ:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setOpentime(true);
                  }}>
                  <Text style={styles.txt1}>{timeStart ? timeStart : `--:--`}</Text>
                  <Image source={images.clock1} style={styles.img2} />
                </TouchableOpacity>
              </View>

              <View style={styles.view2}>
                <Text style={[styles.txt, {marginTop: 20}]}>Kết thúc:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setOpentime1(true);
                  }}>
                  <Text style={styles.txt1}>{timeEnd ? timeEnd : `--:--`}</Text>
                  <Image source={images.clock1} style={styles.img2} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowDepartment(true);
              }}>
              <Image source={images.phongban} style={styles.img} />
              {phongban ? (
                phongban?.map((item: any) => {
                  return (
                    <Text key={item?.id} style={styles.txt1}>
                      {item?.name},
                    </Text>
                  );
                })
              ) : (
                <Text>Chọn phòng ban</Text>
              )}
            </TouchableOpacity>
            <TextInputCustoms
              placeholder="Mô tả"
              img={images.note}
              value={mota}
              setValue={setMota}
              type
            />
            <View style={styles.view1}>
              <BuntomCustom1 text="Tạo lịch" onpress={taolich} isLoading={isLoading} />
            </View>
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={opentime}
        is24Hour={true}
        mode="time"
        onConfirm={(date: any) => {
          setTimeStart(gettime(date));
          setOpentime(false);
        }}
        onCancel={() => setOpentime(false)}
      />
      <DateTimePickerModal
        isVisible={opentime1}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          setTimeEnd(gettime(date));
          setOpentime1(false);
        }}
        onCancel={() => setOpentime1(false)}
      />
      <DateTimePickerModal
        isVisible={showchonNgay}
        mode="date"
        onConfirm={(ab: Date) => {
          setChonNgay(fullday(ab));
          setShowChonNgay(false);
        }}
        onCancel={() => setShowChonNgay(false)}
      />
      <ModalMuntiselectPhongBan
        name="Chọn phòng ban"
        isShow={showDepartment}
        toggleDate={() => setShowDepartment(false)}
        select={setPhongban}
      />
    </View>
  );
};

export default TaoLichHop;

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
    marginTop: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
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
  txt2: {
    color: colors.colorText,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  texterr: {
    top: 2,
    color: 'red',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
  },
  img: {
    height: 25,
    width: 25,
    tintColor: '#959595',
    marginLeft: 5,
    resizeMode: 'cover',
  },
  img1: {
    height: 20,
    width: 15,
    tintColor: '#959595',
    marginLeft: 10,
    resizeMode: 'cover',
  },
  view: {width: '45%', paddingBottom: 30},
  view1: {
    width: '75%',
    alignSelf: 'center',
    marginTop: 30,
  },
  view2: {
    width: '45%',
    paddingBottom: 30,
  },
  view3: {width: sizes._screen_width * 0.9, marginTop: sizes._20sdp},
  img2: {marginRight: 8, height: 26, width: 26},
});
