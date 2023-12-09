import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import Header from '../../component/Header';
import Modalselect from '../../component/modal/Modalselect';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checknumberdayval, consvertTime, gettimesss} from '../../data/checkday';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputCustoms from '../../component/TextInputCustoms';
import BuntomCustom1 from '../../component/BuntomCustom1';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thoigiannghi from '../../data/itemdontu/thoigiannghi';
import ModalLoaiPhep from '../../component/modal/ModalLoaiPhep';
import {useCreateonleaveMutation} from '../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
import {getLeaveType} from '../../res/convert';
import {RootState} from '../../redux/store';
import {vietsuberrors} from '../../data/vietsub/vietsuberrors';
interface XinNghiPhepProps {
  navigation: NavigationProp<Record<string, any>>;
}
const XinNghiPhep = (props: XinNghiPhepProps) => {
  const [loaiNghiPhep, setLoaiNghiPhep] = useState<{
    name: string;
    key: string;
  }>();
  const [ngaynghi, setNgaynghi] = useState('');
  const [ngayketthuc, setNgayKetThuc] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [showLoaiNghi, setShowLoaiNghi] = useState(false);
  const [showNgayNghi, setShowNgayNghi] = useState(false);
  const [showNgayKetThuc, setShowNgayKetThuc] = useState(false);
  const [showphep, setShowPhep] = useState(false);
  const [phep, setPhep] = useState<any>();
  const [batdau, setBatDau] = useState('');
  const [ketThuc, setKetthuc] = useState('');
  const [showbatdau, setShowBatDau] = useState<boolean>(false);
  const [showketThuc, setShowKetthuc] = useState(false);
  const [erros, setErros] = useState({
    ngaynghi: '',
    noidung: '',
    phep: '',
    loaiNghiPhep: '',
    batdau: '',
    ketthuc: '',
    ngayketthuc: '',
  });
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const [submitonleave, {isLoading}] = useCreateonleaveMutation();
  console.log(phep?.id);

  const check = async () => {
    try {
      const aa = await submitonleave({
        employee_id: id,
        leave_duration: loaiNghiPhep?.key,
        day_type: loaiNghiPhep?.key === 'last_half' ? 'last_half' : 'first_half',
        leave_type_id: phep?.id,
        date: ngaynghi,
        note: noiDung,
        start_date: ngaynghi,
        end_date: ngayketthuc,
        start_time: batdau,
        end_time: ketThuc,
      }).unwrap();
      Alert.alert(
        'Thông báo',
        `${aa?.message}`,
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
    } catch (error: any) {
      const err = error?.data?.errors;
      console.log(error);

      if (error?.status == 403) {
        Alert.alert(error?.data?.message);
      } else {
        setErros({
          batdau: vietsuberrors(err?.start_time),
          ketthuc: vietsuberrors(err?.end_time),
          loaiNghiPhep: vietsuberrors(err?.leave_type_id),
          noidung: vietsuberrors(err?.note),
          ngaynghi: vietsuberrors(err?.date),
          phep: vietsuberrors(err?.leave_duration),
          ngayketthuc: vietsuberrors(err?.end_date),
        });
      }
    }
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowLoaiNghi(true);
              }}>
              <Text style={styles.txt1}>
                {loaiNghiPhep?.name ? loaiNghiPhep?.name : 'Chọn loại nghỉ phép'}
              </Text>
              <Image source={images.nghiphep} style={{height: 35, width: 35, marginRight: 2}} />
            </TouchableOpacity>
            {erros?.phep && <Text style={stylescustom.err}>{erros?.phep}</Text>}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowPhep(true);
              }}>
              <Text style={styles.txt1}>{phep ? phep.name : 'Chọn loại phép'}</Text>
              <Icon name="grav" size={30} color={colors.colorText} style={{marginRight: 8}} />
            </TouchableOpacity>
            {erros?.loaiNghiPhep && <Text style={stylescustom.err}>{erros?.loaiNghiPhep}</Text>}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowNgayNghi(true);
              }}>
              <Text style={styles.txt1}>{ngaynghi ? ngaynghi : 'Chọn ngày nghỉ'}</Text>
              <Image source={images.calendar} style={{marginRight: 8}} />
            </TouchableOpacity>
            {erros?.ngaynghi && <Text style={stylescustom.err}>{erros?.ngaynghi}</Text>}

            {loaiNghiPhep?.name === 'Nghỉ nhiều ngày' ? (
              <>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setShowNgayKetThuc(true);
                  }}>
                  <Text style={styles.txt1}>
                    {ngayketthuc ? ngayketthuc : 'Chọn ngày kết thúc'}
                  </Text>
                  <Image source={images.calendar} style={{marginRight: 8}} />
                </TouchableOpacity>
                {erros?.ketthuc && <Text style={stylescustom.err}>{erros?.ketthuc}</Text>}
              </>
            ) : null}
            {loaiNghiPhep?.name == 'Nghỉ theo giờ' ? (
              <>
                <TouchableOpacity style={styles.btn} onPress={() => setShowBatDau(true)}>
                  <Text style={styles.txt1}>
                    {batdau ? consvertTime(batdau) : 'Chọn thời gian bắt đầu'}
                  </Text>
                  <Image source={images.clock1} style={{marginRight: 8}} />
                </TouchableOpacity>
                {erros?.batdau && <Text style={stylescustom.err}>{erros?.batdau}</Text>}

                <TouchableOpacity style={styles.btn} onPress={() => setShowKetthuc(true)}>
                  <Text style={styles.txt1}>
                    {ketThuc ? consvertTime(ketThuc) : 'Chọn thời gian kết thúc'}
                  </Text>
                  <Image source={images.clock1} style={{marginRight: 8}} />
                </TouchableOpacity>
                {erros?.ketthuc && <Text style={stylescustom.err}>{erros?.ketthuc}</Text>}
              </>
            ) : null}
            <View style={{marginTop: sizes._50sdp}}>
              <Text style={styles.txt}>Nhập nội dung:</Text>
              <TextInputCustoms
                type={true}
                img={images.note}
                placeholder="Nội dung"
                value={noiDung}
                setValue={setNoiDung}
              />
              {erros?.noidung && <Text style={stylescustom.err}>{erros?.noidung}</Text>}
            </View>
            <View style={{marginTop: sizes._30sdp, width: '75%', alignSelf: 'center'}}>
              <BuntomCustom1 text="Gửi yêu cầu" onpress={check} isLoading={isLoading} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modalselect
        isShow={showLoaiNghi}
        name={'Chọn loại nghỉ'}
        toggleDate={() => setShowLoaiNghi(false)}
        item={thoigiannghi}
        select={setLoaiNghiPhep}
      />
      <DateTimePickerModal
        isVisible={showNgayNghi}
        mode="date"
        onConfirm={(ab: Date) => {
          let a = checknumberdayval(ab);

          setNgaynghi(a);

          setShowNgayNghi(false);
        }}
        onCancel={() => setShowNgayNghi(false)}
      />
      <DateTimePickerModal
        isVisible={showNgayKetThuc}
        mode="date"
        onConfirm={(ab: Date) => {
          let a = checknumberdayval(ab);

          setNgayKetThuc(a);

          setShowNgayKetThuc(false);
        }}
        onCancel={() => setShowNgayKetThuc(false)}
      />

      <ModalLoaiPhep
        isShow={showphep}
        id={id}
        toggleDate={() => setShowPhep(false)}
        name="Chọn loại phép nghỉ"
        select={(val: any) => {
          setPhep(val);
        }}
      />

      <DateTimePickerModal
        isVisible={showbatdau}
        mode="time"
        onConfirm={(ab: Date) => {
          let a = gettimesss(ab);

          setBatDau(a);

          setShowBatDau(false);
        }}
        onCancel={() => setShowBatDau(false)}
      />
      <DateTimePickerModal
        isVisible={showketThuc}
        mode="time"
        onConfirm={(ab: Date) => {
          let a = gettimesss(ab);

          setKetthuc(a);

          setShowKetthuc(false);
        }}
        onCancel={() => setShowKetthuc(false)}
      />
    </View>
  );
};

export default XinNghiPhep;

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
});
