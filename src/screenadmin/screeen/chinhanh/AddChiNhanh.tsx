import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Platform, Alert} from 'react-native';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {NetInfoUnknownState, useNetInfo} from '@react-native-community/netinfo';
import stylescustom from '../../../res/stylescustom';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import {isRequired, itemcheck} from '../../../res/validate';
import images from '../../../res/images';
import fonts from '../../../res/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {checkvitri} from '../../../redux/state/Checkvitri';
import {NetworkInfo} from 'react-native-network-info';
import {NavigationProp} from '@react-navigation/native';

interface AddChiNhanhProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const AddChiNhanh = (props: AddChiNhanhProps) => {
  const aaaaa = useSelector(checkvitri);
  let layvitri = aaaaa.payload.checkVitri.checkvitri;
  const {diachiIp, name, diachi} = props.route?.params?.data || {};

  const dispatch = useDispatch();
  const [tenChiNhanh, setTenChiNhanh] = useState(name);
  const [ipwifi, setIpWifi] = useState<string | null>(diachiIp);
  const [vitri, setVitri] = useState(diachi);
  const [errChiNhanh, setErrChiNhanh] = useState('');
  const [erripwifi, setErrIpWifi] = useState('');
  const [errvitri, setErrVitri] = useState('');
  const netInfo = useNetInfo();

  const checkip = async () => {
    if (netInfo.isWifiEnabled == true) {
      Alert.alert(
        'Thu thập địa chỉ BSSID',
        'Ứng dụng của chúng tôi thu thập địa chỉ BSSID của bạn để cải thiện chất lượng dịch vụ. Bạn có đồng ý không?',
        [
          {
            text: 'Không đồng ý',
            onPress: () => console.log('Người dùng từ chối việc cung cấp địa chỉ BSSID'),
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              setIpWifi(netInfo?.details?.bssid);
              setErrIpWifi('');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      NetworkInfo.getBSSID().then(bssid => {
        setIpWifi(bssid);
        setErrIpWifi('');
      });
    }
  };

  const check = () => {
    let checkChinhanh = isRequired(tenChiNhanh);
    let checkvitris = isRequired(vitri) || isRequired(layvitri);
    let checkwifi = itemcheck(ipwifi, 'Thêm thông tin wifi hiện tại');
    if (!checkChinhanh) {
      setErrChiNhanh('Chọn chi nhánh');
    }
    if (!checkvitris) {
      setErrVitri('Chọn vị trí');
    }
    if (!checkwifi) {
      setErrIpWifi('Chọn IP wifi');
    }
    if (checkwifi && checkChinhanh && checkvitri) {
      dispatch(checkvitri(''));
      props.navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'CHI NHÁNH'}
        back
        onBackPress={() => {
          props.navigation.goBack();
          dispatch(checkvitri(''));
        }}
      />

      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width * 0.9}}>
          <TextInputcustom
            placeholder={'Nhập tên chi nhánh'}
            icon={'home-city'}
            value={tenChiNhanh}
            setValue={(val: any) => setTenChiNhanh(val)}
            Err={setErrChiNhanh}
          />
          {errChiNhanh ? <Text style={stylescustom.err}>{errChiNhanh}</Text> : null}
          <TouchableOpacity
            style={styles.textinput}
            onPress={() => {
              setErrVitri('');
              props.navigation.navigate('Map1');
            }}>
            <View style={stylescustom.row1}>
              <Image
                source={images.address}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#3366FF',
                }}
              />
              <Text style={styles.text}>{layvitri ? layvitri : vitri ? vitri : 'Thêm vị trí'}</Text>
            </View>
          </TouchableOpacity>
          {errvitri ? <Text style={stylescustom.err}>{errvitri}</Text> : null}
          <TouchableOpacity style={styles.textinput} onPress={checkip}>
            <View style={stylescustom.row1}>
              <Icon name="wifi" color={'#3366FF'} size={25} />
              <Text style={styles.text}>{ipwifi}</Text>
            </View>
            {ipwifi !== 'Thêm thông tin wifi hiện tại' && (
              <Icons
                name="md-trash-bin"
                color={'#3366FF'}
                size={25}
                style={{right: 10}}
                onPress={() => setIpWifi('Thêm thông tin wifi hiện tại')}
              />
            )}
          </TouchableOpacity>
          {erripwifi ? <Text style={stylescustom.err}>{erripwifi}</Text> : null}

          <View style={{marginTop: sizes._25sdp, width: sizes._screen_width * 0.9}}>
            <BuntomCustom1 text="Lưu" onpress={check} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddChiNhanh;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.colorWhite,
    width: '100%',
    borderTopRightRadius: sizes._20sdp,
    borderTopLeftRadius: sizes._20sdp,
    height: sizes._screen_height,
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.colorWhite,
  },
  textinput: {
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
  text: {
    fontSize: sizes._font_size_big,
    color: colors.colorText,
    marginLeft: sizes._12sdp,
    fontFamily: fonts.textRegular,
  },
});
