import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextInputcustom from '../../../component/TextInputcustom';
import Modalselect from '../../../component/modal/Modalselect';
import fonts from '../../../res/fonts';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import {dataSex} from '../../../data/itemnhanvien/gioitinh';
import Loading from '../../../component/Loading';
import ModalDelete from '../../../component/modal/ModalDelete';
import {
  useGetEmployeeIDQuery,
  useGetRolesQuery,
  useGetdepartmentsQuery,
  useGetdesignationsQuery,
  useGetemploymentstatusesQuery,
} from '../../../redux/api/auth.api';
import {Gender} from '../../../res/convert';
import URI from '../../../URI';
import ModalFalse from '../../../component/modal/ModalFalse';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function ThemNhanVien(props: Props) {
  const [ten, setTen] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [sex, setSex] = useState<Select>();
  const [phongban, setPhongban] = useState<Select>();
  const [chucvu, setChucvu] = useState<Select>();
  const [tinhtrang, setTinhtrang] = useState<Select>();
  const [quyen, setQuyen] = useState<Select>();
  const [showmodalsex, setShowmodalsex] = useState(false);
  const [showphongban, setShowphongban] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showchucvu, setshowChucvu] = useState(false);
  const [showtinhtrang, setshowtinhtrang] = useState(false);
  const [showQuyen, setShowQuyen] = useState<any>(false);
  const [hovatendem, setHovatendem] = useState('');
  const [errhovatendem, seterrhovatendem] = useState('');
  const [errName, setErrName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errPass, setErrPass] = useState('');
  const [errsex, seterrSex] = useState<any>('');
  const [errPhongBan, setErrPhongBan] = useState('');
  const [errChucVu, setErrChucVu] = useState('');
  const [errtinhtrang, setErrTinhtrang] = useState<any>('');
  const [errquyen, setErrQuyen] = useState<any>('');
  const [showthanhcong, setShowthanhcong] = useState(false);
  const [showthatbai, setShowThatbai] = useState(false);
  const [thanhcong, setthanhcong] = useState('');
  const {data: departments} = useGetdepartmentsQuery('');
  const {data: employeesstatus} = useGetemploymentstatusesQuery('');
  const {data: roles} = useGetRolesQuery('');
  const {data: designations} = useGetdesignationsQuery('');
  const {data: employeeID, refetch} = useGetEmployeeIDQuery('');
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const timeoutIdRef: any = useRef();

  const getListData = async () => {
    setIsLoading(true);
    const datas = JSON.stringify({
      email: email,
      employee_id: employeeID?.['employee-id'],
      department_id: phongban?.id,
      password: pass,
      first_name: ten,
      last_name: hovatendem,
      designation_id: chucvu?.id,
      employment_status_id: tinhtrang?.id,
      gender: sex?.name,
      roles: [quyen?.id],
      password_confirmation: pass,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datas,
    };
    try {
      await fetch(`${URI}/api/v1/register`, requestOptions).then(response => {
        if (response.ok) {
          setIsLoading(false);

          setShowthanhcong(true);
          setthanhcong('Thêm nhân viên thành công');
          timeoutIdRef.current = setTimeout(() => {
            setShowthanhcong(false);
          }, 3000);
          props.navigation.goBack();
        } else {
          setShowThatbai(true);
          timeoutIdRef.current = setTimeout(() => {
            setShowThatbai(false);
          }, 3000);
        }
      });
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'NHÂN VIÊN'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Thông tin cơ bản</Text>
          <View style={styles.view}>
            <TextInputcustom
              icon="account-tie"
              placeholder={'Nhập họ và tên đệm'}
              value={hovatendem}
              setValue={(val: any) => setHovatendem(val)}
            />
            {errhovatendem ? <Text style={stylescustom.err}>{errhovatendem}</Text> : null}
            <TextInputcustom
              icon="account-tie"
              placeholder={'Nhập tên'}
              value={ten}
              setValue={(val: any) => setTen(val)}
            />
            {errName ? <Text style={stylescustom.err}>{errName}</Text> : null}
            <TouchableOpacity
              style={[styles.textinput, {justifyContent: 'space-between'}]}
              onPress={() => setShowmodalsex(true)}>
              <View style={stylescustom.row1}>
                <Icon name="intersex" color={'#3366FF'} size={24} style={{marginLeft: 5}} />
                <Text style={styles.text1}>{sex ? Gender(sex?.name) : 'Chọn giới tính'}</Text>
              </View>
              <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
            </TouchableOpacity>
            {errsex ? <Text style={stylescustom.err}>{errsex}</Text> : null}
            <TextInputcustom
              icon="email"
              placeholder={'Nhập email'}
              value={email}
              setValue={(val: any) => setEmail(val)}
            />
            {errEmail ? <Text style={stylescustom.err}>{errEmail}</Text> : null}
            <TextInputcustom
              icon="lock"
              placeholder={'Nhập mật khẩu'}
              value={pass}
              setValue={(val: any) => setPass(val)}
            />
            {errPass ? <Text style={stylescustom.err}>{errPass}</Text> : null}
            <View style={{width: sizes._screen_width}}>
              <Text style={styles.text}>Thông tin nâng cao</Text>
            </View>
            <TouchableOpacity style={styles.textinput1} onPress={() => setShowphongban(true)}>
              <View style={stylescustom.row1}>
                <MaterialIcons name="adjust" color={'#3366FF'} size={24} />
                <Text style={styles.text1}>{phongban ? phongban.name : 'Chọn phòng ban'}</Text>
              </View>
              <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
            </TouchableOpacity>
            {errPhongBan ? <Text style={stylescustom.err}>{errPhongBan}</Text> : null}
            <TouchableOpacity style={styles.textinput1} onPress={() => setshowChucvu(true)}>
              <View style={stylescustom.row1}>
                <Icons name="account-tie" color={'#3366FF'} size={24} />
                <Text style={styles.text1}>{chucvu ? chucvu.name : 'Chọn chức vụ'}</Text>
              </View>
              <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
            </TouchableOpacity>
            {errChucVu ? <Text style={stylescustom.err}>{errChucVu}</Text> : null}
            <TouchableOpacity
              style={styles.textinput1}
              onPress={() => {
                setshowtinhtrang(true);
              }}>
              <View style={stylescustom.row1}>
                <Icons name="account-clock" color={'#3366FF'} size={24} />
                <Text style={styles.text1}>
                  {tinhtrang ? tinhtrang.name : 'Tình trạng việc làm'}
                </Text>
              </View>
              <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
            </TouchableOpacity>
            {errtinhtrang ? <Text style={stylescustom.err}>{errtinhtrang}</Text> : null}
            <TouchableOpacity style={styles.textinput1} onPress={() => setShowQuyen(true)}>
              <View style={stylescustom.row1}>
                <Icons name="alpha-q-circle" color={'#3366FF'} size={24} />
                <Text style={styles.text1}>{quyen ? quyen.name : 'Chọn quyền sử dụng'}</Text>
              </View>
              <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
            </TouchableOpacity>
            {errquyen ? <Text style={stylescustom.err}>{errquyen}</Text> : null}
          </View>
          <View style={styles.btn}>
            <BuntomCustom1 text="Lưu" onpress={getListData} />
          </View>
        </ScrollView>
      </View>
      <Modalselect
        isShow={showmodalsex}
        item={dataSex}
        name="Giới tính"
        toggleDate={() => setShowmodalsex(false)}
        select={setSex}
      />
      <Modalselect
        isShow={showphongban}
        item={departments?.data}
        name="Chọn phòng ban"
        toggleDate={() => setShowphongban(false)}
        select={setPhongban}
      />

      <Modalselect
        isShow={showchucvu}
        item={designations?.data}
        name="Chọn chức vụ"
        toggleDate={() => setshowChucvu(false)}
        select={setChucvu}
      />
      <Modalselect
        isShow={showtinhtrang}
        item={employeesstatus?.data}
        name="Chọn tình trạng việc làm"
        toggleDate={() => setshowtinhtrang(false)}
        select={setTinhtrang}
      />
      <Modalselect
        isShow={showQuyen}
        item={roles?.data}
        name="Chọn quyền sử dụng"
        toggleDate={() => setShowQuyen(false)}
        select={setQuyen}
      />
      <ModalDelete isShow={showthanhcong} val={thanhcong} />
      <ModalFalse isShow={showthatbai} val={'Thêm nhân viên thất bại'} />
      {isLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width,
  },
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_max_max,
    marginLeft: sizes._25sdp,
    marginTop: sizes._20sdp,
    fontFamily: fonts.textRegular,
  },
  textinput: {
    height: sizes._60sdp,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: sizes._25sdp,
  },
  textinput1: {
    height: sizes._60sdp,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: sizes._25sdp,
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: sizes._font_size_big,
    color: 'black',
    marginLeft: sizes._10sdp,
    fontFamily: fonts.textRegular,
  },
  icon: {marginRight: 10},
  text2: {
    fontSize: sizes._font_size_big,
    color: 'black',
    fontFamily: fonts.textRegular,
    height: sizes._60sdp,
    width: sizes._screen_width * 0.75,

    marginLeft: 5,
  },
  textinput2: {
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    width: sizes._screen_width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: sizes._25sdp,
  },
  textinput11: {
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    width: sizes._screen_width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes._25sdp,
    height: sizes._60sdp,
  },
  text11: {
    fontSize: sizes._font_size_big,
    color: 'black',
    fontFamily: fonts.textRegular,

    width: sizes._screen_width * 0.75,

    marginLeft: 5,
  },
  view: {
    alignItems: 'center',
    marginBottom: 20,
    width: sizes._screen_width * 0.9,
    alignSelf: 'center',
  },
  btn: {
    width: sizes._screen_width * 0.9,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
