import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stylescustom from '../../../res/stylescustom';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import fonts from '../../../res/fonts';
import {isRequired} from '../../../res/validate';
import Modalselect from '../../../component/modal/Modalselect';
import Modalselectuser from '../../../component/modal/Modalselectuser';
import ModalDelete from '../../../component/modal/ModalDelete';
import {
  useAddDepartsmentMutation,
  useGetAllWorkingShiftsQuery,
  useGetdepartmentsQuery,
} from '../../../redux/api/auth.api';
import ModalFalse from '../../../component/modal/ModalFalse';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const AddPhongban = (props: Props) => {
  const [namePhongBan, setNamePhongBan] = useState('');
  const [mota, setMota] = useState('');
  const [errnamePhongBan, setErrNamePhongBan] = useState('');
  const [errmota, setErrMota] = useState('');
  const [errQuanLy, seterrQuanLy] = useState('');
  const [errCa, seterrCa] = useState('');
  const [quanly, setQuanly] = useState<any>('');
  const [pbcaptren, setPbCaptren] = useState<any>('');
  const [diachi, setDiaChi] = useState('');
  const [calamviec, setCalamViec] = useState<any>('');
  const [showQuanLy, setShowQuanLy] = useState(false);
  const [showPhongBan, setShowPhongBan] = useState(false);
  const [showCaLamViec, setShowCaLamViec] = useState(false);
  const [showthanhcong, setShowthanhcong] = useState(false);
  const [thanhcong, setthanhcong] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setID] = useState('');
  useEffect(() => {
    const a = async () => {
      if (props.route.params.id == 1) {
        let a = await props.route.params.data;
        setID(a?.id);
        setMota(a.description);
        setNamePhongBan(a.name);
        setDiaChi(a.location);
        setQuanly(a.manager);
        setPbCaptren(a.parent_department);
        setCalamViec(a?.working_shifts[a?.working_shifts.length - 1]);
        setDiaChi(a.location);
        setMota(a?.description);
      }
    };
    a();
  }, []);
  const {data: workshift} = useGetAllWorkingShiftsQuery('');
  const {data: departments} = useGetdepartmentsQuery('');
  const [addDepartment, {isLoading}] = useAddDepartsmentMutation();
  const timeoutIdRef: any = useRef();
  const check = async () => {
    let checkphongban = isRequired(namePhongBan);
    let checkmota = isRequired(mota);
    if (!checkphongban) {
      setErrNamePhongBan('Nhập tên phòng ban');
    } else {
      setErrNamePhongBan('');
    }
    if (!checkmota) {
      setErrMota('Nhập mô tả');
    } else {
      setErrMota('');
    }
    if (checkphongban && checkmota) {
      try {
        const add = (await addDepartment({
          data: {
            name: namePhongBan,
            description: mota,
            manager_id: quanly.id,
            working_shift_id: calamviec.id,
            department_id: pbcaptren.id,
            location: diachi,
            _method: props.route?.params?.id == 2 ? 'post' : 'patch',
          },
          id: id,
        }).unwrap()) as any;
        setShowthanhcong(true);
        setthanhcong(add?.message);
        timeoutIdRef.current = setTimeout(() => {
          setShowthanhcong(false);
          props.navigation.goBack();
        }, 2000);
      } catch (error: any) {
        seterrQuanLy(error?.data?.errors?.manager_id);
        seterrCa(error?.data?.errors?.working_shift_id);

        setShow(true);
        timeoutIdRef.current = setTimeout(() => {
          setShow(false);
        }, 2000);
      }
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'PHÒNG BAN'}
        back
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width * 0.9}}>
          <TextInputcustom
            icon="account-supervisor"
            placeholder={'Nhập tên phòng ban'}
            value={namePhongBan}
            setValue={(val: string) => setNamePhongBan(val)}
          />
          {errnamePhongBan ? <Text style={stylescustom.err}>{errnamePhongBan}</Text> : null}
          <TextInputcustom
            value={mota}
            setValue={(val: string) => setMota(val)}
            placeholder="Nhập mô tả"
            icon="content-paste"
          />
          {errmota ? <Text style={stylescustom.err}>{errmota}</Text> : null}
          <TouchableOpacity style={styles.item} onPress={() => setShowQuanLy(true)}>
            <View style={stylescustom.row1}>
              <MaterialIcons
                name="person"
                color={'#3366FF'}
                size={25}
                style={{marginLeft: sizes._8sdp}}
              />
              <Text
                style={{
                  color: quanly ? 'black' : '#A9A9A9',
                  fontSize: sizes._font_size_big,
                  marginLeft: 5,
                  fontFamily: fonts.textRegular,
                }}>
                {quanly ? (quanly.full_name ? quanly.full_name : quanly) : 'Quản lý'}
              </Text>
            </View>
          </TouchableOpacity>
          {errQuanLy ? <Text style={stylescustom.err}>{errQuanLy}</Text> : null}

          <TouchableOpacity style={styles.item} onPress={() => setShowPhongBan(true)}>
            <View style={stylescustom.row1}>
              <MaterialIcons
                name="group-work"
                color={'#3366FF'}
                size={25}
                style={{marginLeft: sizes._8sdp}}
              />
              <Text
                style={{
                  color: pbcaptren ? 'black' : '#A9A9A9',
                  fontSize: sizes._font_size_big,
                  marginLeft: 5,
                  fontFamily: fonts.textRegular,
                }}>
                {pbcaptren ? (pbcaptren.name ? pbcaptren.name : pbcaptren) : 'Phòng ban cấp trên'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => setShowCaLamViec(true)}>
            <View style={stylescustom.row1}>
              <MaterialIcons
                name="access-alarm"
                color={'#3366FF'}
                size={25}
                style={{marginLeft: sizes._8sdp}}
              />
              <Text
                style={{
                  color: calamviec ? 'black' : '#A9A9A9',
                  fontSize: sizes._font_size_big,
                  marginLeft: 5,
                  fontFamily: fonts.textRegular,
                }}>
                {calamviec ? (calamviec.name ? calamviec.name : calamviec) : 'Ca làm việc'}
              </Text>
            </View>
          </TouchableOpacity>
          {errCa ? <Text style={stylescustom.err}>{errCa}</Text> : null}

          <TextInputcustom
            icon="home-map-marker"
            placeholder={'Địa chỉ'}
            value={diachi}
            setValue={setDiaChi}
          />
          <View style={styles.btn}>
            <BuntomCustom1 onpress={check} text="Lưu" isLoading={isLoading} />
          </View>
        </View>
      </View>
      <Modalselect
        isShow={showPhongBan}
        item={departments?.data}
        name={'Chọn phòng ban cấp trên'}
        toggleDate={() => setShowPhongBan(false)}
        select={setPbCaptren}
      />
      <Modalselect
        isShow={showCaLamViec}
        item={workshift?.data}
        name={'Chọn ca làm việc'}
        toggleDate={() => setShowCaLamViec(false)}
        select={setCalamViec}
      />
      <Modalselectuser
        isShow={showQuanLy}
        search
        name={'Chọn quản lý'}
        toggleDate={() => setShowQuanLy(false)}
        select={setQuanly}
      />
      <ModalFalse isShow={show} val={'Tạo phòng ban thất bại!'} />
      <ModalDelete isShow={showthanhcong} val={thanhcong} />
    </View>
  );
};

export default AddPhongban;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.colorWhite,
  },
  item: {
    flexDirection: 'row',
    height: sizes._60sdp,
    alignItems: 'center',
    backgroundColor: '#e8e9ec9e',
    marginTop: sizes._25sdp,
    borderRadius: 10,
    paddingLeft: 5,
    width: sizes._screen_width * 0.9,
    justifyContent: 'space-between',
  },
  btn: {width: sizes._screen_width * 0.9, marginTop: sizes._25sdp},
});
