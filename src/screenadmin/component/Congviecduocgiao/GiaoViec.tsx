import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../component/Header';
import colors from '../../../res/color';
import fonts from '../../../res/fonts';
import images from '../../../res/images';
import sizes from '../../../res/sizes';
import stylescustom from '../../../res/stylescustom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checknumberdayval} from '../../../data/checkday';
import {isRequired} from '../../../res/validate';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import Modalselectuser from '../../../component/modal/Modalselectuser';
import Loading from '../../../component/Loading';
import ModalDelete from '../../../component/modal/ModalDelete';
import {usePostasignedTaskMutation} from '../../../redux/api/auth.api';
import {RootState} from '../../../redux/store';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import {NavigationProp} from '@react-navigation/native';
interface GiaoViecProps {
  navigation: NavigationProp<Record<string, any>>;
}

const GiaoViec = (props: GiaoViecProps) => {
  const [tieuDe, setTieuDe] = React.useState('');
  const [mota, setMota] = React.useState('');
  const [batdau, setBatDau] = React.useState('');
  const [ketThuc, setKetThuc] = React.useState('');
  const [errtieuDe, setErrTieuDe] = React.useState('');
  const [errmota, setErrMota] = React.useState('');
  const [errbatdau, setErrBatDau] = React.useState('');
  const [errketThuc, setErrKetThuc] = React.useState('');
  const [showbatdau, setShowbatdau] = React.useState(false);
  const [showketthuc, setShowketthuc] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [nhanvien, setNhanVien] = React.useState<any>('');
  const [errnhanvien, setErrNhanVien] = React.useState('');
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const [showthanhcong, setShowthanhcong] = React.useState(false);
  const [thanhcong, setthanhcong] = React.useState('');
  const info = useAppSelect(data => data.infoUser);

  const timeoutIdRef: any = React.useRef();
  const [createTask, {isLoading}] = usePostasignedTaskMutation();
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const check = async () => {
    try {
      const post = await createTask({
        name: tieuDe,
        description: mota,
        start_date: batdau,
        end_date: ketThuc,
        user_id: nhanvien.id,
        job_assignor_id: info?.id,
        status_id: 1,
      }).unwrap();
      setShowthanhcong(true);
      setthanhcong(post?.message);
      timeoutIdRef.current = setTimeout(() => {
        setShowthanhcong(false);
        props.navigation.goBack();
      }, 2000);
    } catch (error: any) {
      let errr = error.data.errors;
      let check = isRequired(nhanvien);
      let check1 = isRequired(mota);
      if (error.data.message) {
        if (!check) {
          setErrNhanVien('Chưa chọn nhân viên');
        }
        if (!check1) {
          setErrMota('Nhập mô tả');
        }
      }
      setErrBatDau(errr.start_date);
      setErrKetThuc(errr.end_date);
      setErrTieuDe(errr.name);
    }
  };
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'GIAO VIỆC'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: sizes._screen_width, flex: 1}}>
          <View style={styles.view}>
            <Text style={[stylescustom.textEmail, {fontSize: sizes._font_size_big_big}]}>
              Tiêu đề công việc:
            </Text>
            <View style={[stylescustom.row2, [styles.textinput1]]}>
              <Icons name="pen" color={'black'} size={20} />
              <TextInput
                value={tieuDe}
                onChangeText={setTieuDe}
                style={styles.textinput}
                cursorColor={'black'}
              />
            </View>
            {errtieuDe ? <Text style={stylescustom.err}>{errtieuDe}</Text> : null}
            <Text
              style={[stylescustom.textEmail, {fontSize: sizes._font_size_big_big, marginTop: 20}]}>
              Mô tả:
            </Text>
            <View style={[stylescustom.row2, [styles.textinput1, {height: 150, padding: 12}]]}>
              <Image source={images.note} resizeMode={'contain'} style={styles.img1} />
              <TextInput
                value={mota}
                onChangeText={setMota}
                style={[styles.textinput, {height: 130}]}
                cursorColor={'black'}
                multiline
              />
            </View>
            {errmota ? <Text style={stylescustom.err}>{errmota}</Text> : null}
            <View style={styles.item}>
              <View style={{width: '45%'}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Thời gian từ:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setShowbatdau(true);
                    // setErrTime('');
                  }}>
                  <Text style={styles.txt1}>{batdau}</Text>
                  <Image source={images.thoigian} style={styles.img} />
                </TouchableOpacity>
                {errbatdau ? <Text style={stylescustom.err}>{errbatdau}</Text> : null}
              </View>

              <View style={{width: '45%'}}>
                <Text style={[styles.txt, {marginTop: 20}]}>Đến:</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => {
                    setShowketthuc(true);
                    // setErrTimes('');
                  }}>
                  <Text style={styles.txt1}>{ketThuc}</Text>
                  <Image source={images.thoigian} style={styles.img} />
                </TouchableOpacity>
                {errketThuc ? <Text style={stylescustom.err}>{errketThuc}</Text> : null}
              </View>
            </View>
            <TouchableOpacity style={styles.textinput2} onPress={() => setShowModal(true)}>
              <Text style={styles.txt}>{nhanvien ? nhanvien.full_name : 'Chọn nhân viên'}</Text>
              <Icons
                name="chevron-down"
                color={colors.colorText}
                size={20}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            {errnhanvien ? <Text style={stylescustom.err}>{errnhanvien}</Text> : null}
            <View style={styles.view1}>
              <BuntomCustom1 text="Tạo" onpress={check} />
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoading && <Loading />}
      <ModalDelete isShow={showthanhcong} val={thanhcong} />
      <DateTimePickerModal
        isVisible={showbatdau}
        is24Hour={true}
        mode="date"
        onConfirm={(date: any) => {
          let a = checknumberdayval(date);
          setBatDau(a);
          setShowbatdau(false);
        }}
        onCancel={() => setShowbatdau(false)}
      />
      <DateTimePickerModal
        isVisible={showketthuc}
        is24Hour={true}
        mode="date"
        onConfirm={(date: any) => {
          let a = checknumberdayval(date);
          setKetThuc(a);
          setShowketthuc(false);
        }}
        onCancel={() => setShowketthuc(false)}
      />
      <Modalselectuser
        isShow={showModal}
        name={'Chọn nhân viên'}
        toggleDate={() => setShowModal(false)}
        search
        select={setNhanVien}
      />
    </View>
  );
};

export default GiaoViec;

const styles = StyleSheet.create({
  textinput: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    height: 50,
    width: sizes._screen_width * 0.8,
  },
  textinput1: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    paddingLeft: 10,
    marginTop: 10,
  },
  textinput2: {
    borderRadius: sizes._10sdp,
    borderWidth: 1,
    borderColor: colors.colorText,
    height: 50,
    paddingLeft: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    width: sizes._screen_width * 0.9,
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
    fontSize: sizes._screen_width * 0.037,
    marginLeft: 10,
  },
  img: {
    marginRight: 8,
    height: 24,
    width: 24,
    tintColor: colors.colorText,
  },
  img1: {
    height: 27,
    width: 27,
    tintColor: colors.colorText,
    alignSelf: 'flex-start',
  },
  view: {
    width: sizes._screen_width * 0.9,
    marginTop: sizes._30sdp,
    alignSelf: 'center',
    paddingBottom: 30,
  },
  view1: {marginTop: 25, width: '75%', alignSelf: 'center'},
});
