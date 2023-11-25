import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {
  useEmployeeQuery,
  useGetRolesQuery,
  useGetdepartmentsQuery,
  useGetdesignationsQuery,
  useGetemploymentstatusesQuery,
  usePutEmployeeMutation,
} from '../../../redux/api/auth.api';
import {Gender} from '../../../res/convert';
import {NavigationProp} from '@react-navigation/native';
import Camera1 from './Camera1';
import axios from 'axios';
import URI_FACE, {config} from '../../../URI_FACE';
import {Image} from 'react-native';
import images from '../../../res/images';
import {Alert} from 'react-native';
import ModalDelete from '../../../component/modal/ModalDelete';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}

export default function NhanVien(props: Props) {
  const {data, isLoading} = useEmployeeQuery(`${props.route?.params?.data}`);
  const {data: designations} = useGetdesignationsQuery('');
  const {data: departments} = useGetdepartmentsQuery('');
  const {data: employeesstatus} = useGetemploymentstatusesQuery('');
  const {data: roles} = useGetRolesQuery('');
  const [hovatendem, setHovatendem] = useState<string | undefined>();
  const [ten, setTen] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [sex, setSex] = useState<Select>();
  const [phongban, setPhongban] = useState<Select>();
  const [chucvu, setChucvu] = useState<Select>();
  const [tinhtrang, setTinhtrang] = useState<Select>();
  const [quyen, setQuyen] = useState<Select>();
  const [showmodalsex, setShowmodalsex] = useState(false);
  const [showphongban, setShowphongban] = useState(false);
  const [showchucvu, setshowChucvu] = useState(false);
  const [showtinhtrang, setshowtinhtrang] = useState(false);
  const [showQuyen, setShowQuyen] = useState<any>(false);
  const [show2, setShow2] = useState(false);

  const timeoutIdRef: any = useRef();
  useEffect(() => {
    setHovatendem(data?.last_name);
    setTen(data?.first_name);
    setSex({
      name: data?.profile?.gender,
    });
    setEmail(data?.email);
    setPhongban({
      name: data?.department?.name,
    });
    setChucvu({
      name: data?.designation?.name,
    });
    setTinhtrang({name: data?.employment_status?.name});
    setQuyen({name: data?.roles[0]?.name});
  }, [data]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState('');

  const [dataImage, setDataImage] = useState<[]>([]);
  const [status, setStatus] = useState<number>(404);
  const checkData = async () => {
    try {
      const dataImg = await axios.get(`${URI_FACE}/v2/person/${data?.uuid}`, config);
      setStatus(dataImg?.status);
      setDataImage(dataImg?.data?.faces);
    } catch (error: any) {
      setStatus(error.response?.status);
    }
  };
  useEffect(() => {
    checkData();
  }, [data]);

  const formData = new FormData();
  formData.append('photos', {
    uri: image,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });
  formData.append('name', data?.full_name);
  const [PutUuid, {isLoading: isLoadinguuid}] = usePutEmployeeMutation();
  const creatUuid = async () => {
    if (image) {
      try {
        const create = await axios.post(`${URI_FACE}/v2/person`, formData, config);
        const uploadUuid = await PutUuid({
          id: data?.id,
          uuid: create.data?.uuid,
        });
        if (uploadUuid) {
          setShow2(true);
          timeoutIdRef.current = setTimeout(() => {
            setShow2(false);
          }, 3000);
        }
      } catch (error: any) {
        console.log(error);

        if (error.message == `Can't find faces in attached images`) {
          Alert.alert('Không phát hiện khuôn mặt');
        }
      }
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const upLoad = await axios.post(`${URI_FACE}/v2/person/${data?.uuid}`, formData, config);
        if (upLoad.status === 200) {
          setShow2(true);
          timeoutIdRef.current = setTimeout(() => {
            setShow2(false);
          }, 3000);
        }
      } catch (error) {
        Alert.alert('Tải ảnh thất bại');
      }
    }
  };
  return (
    <View style={stylescustom.container}>
      {showCamera ? (
        <Camera1 showCamera={() => setShowCamera(false)} photo={setImage} />
      ) : (
        <>
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
                <TextInputcustom
                  icon="account-tie"
                  placeholder={'Nhập tên'}
                  value={ten}
                  setValue={(val: any) => setTen(val)}
                />
                <TouchableOpacity
                  style={[styles.textinput, {justifyContent: 'space-between'}]}
                  onPress={() => setShowmodalsex(true)}>
                  <View style={stylescustom.row1}>
                    <Icon name="intersex" color={'#3366FF'} size={24} style={{marginLeft: 5}} />
                    <Text style={styles.text1}>
                      {sex?.name ? Gender(sex?.name) : 'Chọn giới tính'}
                    </Text>
                  </View>
                  <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
                </TouchableOpacity>
                <TextInputcustom
                  icon="email"
                  placeholder={'Nhập email'}
                  value={email}
                  setValue={(val: any) => setEmail(val)}
                />

                <View style={{width: sizes._screen_width}}>
                  <Text style={styles.text}>Thông tin nâng cao</Text>
                </View>

                <TouchableOpacity style={styles.textinput1} onPress={() => setShowphongban(true)}>
                  <View style={stylescustom.row1}>
                    <MaterialIcons name="adjust" color={'#3366FF'} size={24} />
                    <Text style={styles.text1}>
                      {phongban?.name ? phongban?.name : 'Chọn phòng ban'}
                    </Text>
                  </View>
                  <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.textinput1} onPress={() => setshowChucvu(true)}>
                  <View style={stylescustom.row1}>
                    <Icons name="account-tie" color={'#3366FF'} size={24} />
                    <Text style={styles.text1}>{chucvu?.name ? chucvu?.name : 'Chọn chức vụ'}</Text>
                  </View>
                  <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textinput1}
                  onPress={() => {
                    setshowtinhtrang(true);
                  }}>
                  <View style={stylescustom.row1}>
                    <Icons name="account-clock" color={'#3366FF'} size={24} />
                    <Text style={styles.text1}>
                      {tinhtrang?.name ? tinhtrang?.name : 'Tình trạng việc làm'}
                    </Text>
                  </View>
                  <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.textinput1} onPress={() => setShowQuyen(true)}>
                  <View style={stylescustom.row1}>
                    <Icons name="alpha-q-circle" color={'#3366FF'} size={24} />
                    <Text style={styles.text1}>{quyen?.name}</Text>
                  </View>
                  <Icon name="angle-down" size={25} color={'#3366FF'} style={styles.icon} />
                </TouchableOpacity>
                <View style={{width: sizes._screen_width}}>
                  <Text style={styles.txt}>Dữ liệu chấm công</Text>
                </View>
                <View style={styles.view2}>
                  <Pressable onPress={() => setShowCamera(true)}>
                    <Image source={images.addImage} style={styles.image} />
                  </Pressable>
                  {dataImage?.map((item: typeImageCheck) => {
                    return (
                      <>
                        <Image source={{uri: item?.url}} style={styles.image1} key={item?.uuid} />
                      </>
                    );
                  })}

                  {image && <Image source={{uri: image}} style={styles.image1} />}
                </View>
              </View>
              <View style={styles.view1}>
                <BuntomCustom1
                  text="Lưu"
                  onpress={() => {
                    if (status === 404) {
                      creatUuid();
                    } else if (status === 200) {
                      uploadImage();
                    }
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </>
      )}
      {isLoadinguuid && <Loading />}
      {isLoading && <Loading />}
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
      <ModalDelete val={'Cập nhật thành công'} isShow={show2} />
      <Modalselect
        isShow={showQuyen}
        item={roles?.data}
        name="Chọn quyền sử dụng"
        toggleDate={() => setShowQuyen(false)}
        select={setQuyen}
      />
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
  view1: {
    width: sizes._screen_width * 0.9,
    alignSelf: 'center',
    marginBottom: 50,
  },
  txt: {
    color: colors.colorblack,
    fontSize: sizes._font_size_max_max,
    marginLeft: sizes._25sdp,
    marginTop: sizes._20sdp,
    fontFamily: fonts.textRegular,
  },
  image: {
    height: 60,
    width: 60,
  },
  view2: {
    ...stylescustom.row1,
    alignSelf: 'center',
    width: sizes._screen_width * 0.9,
  },
  image1: {
    height: 60,
    width: 60,
    marginHorizontal: 10,
  },
});
