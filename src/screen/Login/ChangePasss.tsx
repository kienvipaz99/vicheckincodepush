import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import sizes from '../../res/sizes';
import Header from '../../component/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButonCustom from '../../component/ButonCustom';
import TextInputcustom from '../../component/TextInputcustom';
import colors from '../../res/color';
import BuntomCustom1 from '../../component/BuntomCustom1';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import fonts from '../../res/fonts';
import stylescustom from '../../res/stylescustom';
import {useChangePassWordMutation} from '../../redux/api/auth.api';
import {RootState} from '../../redux/store';
import Loading from '../../component/Loading';
import ModalDelete from '../../component/modal/ModalDelete';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const ChangePasss = (props: Props) => {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const timeoutIdRef: any = useRef();
  const [show, setShow] = useState(false);

  const [mkcu, setMkcu] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [passnew, setPassNew] = useState<string>();
  const [errmkcu, setErrMkcu] = useState<string>();
  const [errpass, setErrPass] = useState<string>();

  const [change, {isLoading, data}] = useChangePassWordMutation();
  const check = async () => {
    try {
      await change({
        id: id,
        data: {
          old_password: mkcu,
          password: pass,
          password_confirmation: passnew,
        },
      })
        .unwrap()
        .then(e => console.log(e));

      setShow(true);
      timeoutIdRef.current = setTimeout(() => {
        setShow(false);
      }, 2000);
    } catch (error: any) {
      console.log(error?.data?.errors);

      setErrMkcu(error?.data?.errors?.old_password);
      setErrPass(error?.data?.errors?.password);
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
        textTittle={'Đổi mật khẩu'}
        back
        onBackPress={() => props.navigation.goBack()}
      />

      <View style={stylescustom.contentContainer}>
        <View style={{alignItems: 'center', marginTop: sizes._20sdp}}>
          <TextInputcustom
            icon="lock"
            placeholder={'Nhập mật khẩu cũ'}
            value={mkcu}
            setValue={setMkcu}
            Err={setErrMkcu}
          />
          {errmkcu ? <Text style={stylescustom.err}>{errmkcu}</Text> : null}
          <TextInputcustom
            icon="lock-question"
            placeholder={'Nhập mật khẩu mới'}
            value={pass}
            setValue={setPass}
            Err={setErrPass}
          />
          {errpass ? <Text style={stylescustom.err}>{errpass}</Text> : null}
          <TextInputcustom
            icon="lock-open-check"
            placeholder={'Nhập lại mật khẩu mới'}
            value={passnew}
            setValue={setPassNew}
          />
        </View>

        <View style={styles.btn}>
          <BuntomCustom1 text={'Thay đổi'} onpress={check} />
        </View>
      </View>
      <ModalDelete isShow={show} val={data?.message} />
      {isLoading && <Loading />}
    </View>
  );
};
export default ChangePasss;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
  },

  btn: {
    marginTop: sizes._30sdp,
    width: sizes._screen_width * 0.7,
  },
});
