import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import images from '../../res/images';
import ButonCustom from '../../component/ButonCustom';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../redux/state/Data';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import {addKey} from '../../redux/state/keytoken';
import {UserID} from '../../redux/state/infoUser';
import {NavigationProp} from '@react-navigation/native';
import {axiosAuth} from '../../redux/api/axiosClient';
import {
  useFcmtokenMutation,
  useLoginMutation,
  useVerifytokenMutation,
} from '../../redux/api/auth.api';
import {getFCMToken} from '../../utils/pushnotification_helper';
import {RootState} from '../../redux/store';
import FormLogin from './FormLogin';
import Loading from '../../component/Loading';

const Login = ({navigation}: {navigation: NavigationProp<Record<string, any>>}) => {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const dangnhap = useAppSelect(data => data?.data?.username);
  const {email, password} = dangnhap || {};
  const [user, setUser] = useState(email);
  const [pass, setPass] = useState(password);
  const [errpass, setErrPass] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (email && password) {
      loginSubmit();
    }
  }, []);
  const [login] = useLoginMutation();
  const [putFCM] = useFcmtokenMutation();
  const [veryfi] = useVerifytokenMutation();
  const loginSubmit = async () => {
    setErrPass('');
    setLoading(true);
    const fcm = await getFCMToken();
    try {
      const data = await loginUser();
      if (data) {
        dispatch(addKey(data?.access_token));
        dispatch(
          addUser({
            email: user,
            password: pass,
          }),
        );
        axiosAuth(data?.access_token);
        const datas = await veryfi({
          token: data?.access_token,
        }).unwrap();
        const dataa = datas as verifytoken;
        dispatch(UserID(dataa?.id));
        await updateFCMToken(dataa.id, fcm);
        const roles = dataa?.roles[0];
        if (roles?.id === 1) {
          navigation.navigate('ButtonTabBarAdmin');
        } else {
          navigation.navigate('Home1');
        }
      }
    } catch (error) {
      handleLoginError(error);
    }
    setLoading(false);
  };

  const loginUser = async () => {
    try {
      const data = await login({
        email: user,
        password: pass,
      }).unwrap();
      return data;
    } catch (error) {
      setErrPass('Thông tin tài khoản hoặc mật khẩu không chính xác');
    }
  };

  const updateFCMToken = async (userId: number, fcmToken: string | null) => {
    try {
      await putFCM({
        id: userId,
        data: {
          fcm_token: fcmToken,
        },
      }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const handleLoginError = (error: any) => {
    let errors = error as errLogin;
    if (errors) {
      setErrPass('Lỗi đăng nhập');
      console.log(errors, 'aa');
    }
  };

  return (
    <ScrollView style={{flex: 1}} bounces={false}>
      <ImageBackground source={images.bg} style={styles.imgbg}>
        <FormLogin errpass={errpass} pass={pass} user={user} setUser={setUser} setPass={setPass} />
        <View style={styles.view2}>
          <ButonCustom Textbtn={'ĐĂNG NHẬP'} Opress={loginSubmit} color={'white'} />
        </View>
      </ImageBackground>
      {loading && <Loading />}
    </ScrollView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: sizes._screen_height,
  },
  logo: {
    marginTop: sizes._screen_height * 0.15,
    alignItems: 'center',
  },
  iputuser: {
    color: colors.colorText,
    // fontFamily: 'txt',

    fontFamily: fonts.textRegular,
    width: sizes._screen_width * 0.7,
    height: '100%',
    marginLeft: 10,
  },

  imgbg: {
    height: sizes._screen_height,
    width: sizes._screen_width,
  },

  view1: {width: '100%', alignItems: 'center'},
  view2: {
    alignItems: 'center',
    marginTop: 20,
    width: sizes._screen_width * 1,
  },
});
