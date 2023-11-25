import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import sizes from '../../../res/sizes';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import ModalDelete from '../../../component/modal/ModalDelete';
import {usePostdesignationsMutation} from '../../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function SuaChucVu(props: Props) {
  const {name, id, mota} = props?.route?.params?.data;
  const [tenchucVu, setTenChuVu] = useState(name);
  const [motas, setMotas] = useState(mota);
  const [errtenchucVu, setErrTenChuVu] = useState('');
  const [message, setmessage] = useState('');
  const [show, setShow] = useState(false);
  const timeoutIdRef: any = useRef();
  const [AddPosition, {isLoading}] = usePostdesignationsMutation();
  const check = async () => {
    try {
      const add = (await AddPosition({
        id: id,
        data: {
          name: tenchucVu,
          tenant_id: 1,
          description: motas,
          _method: 'patch',
        },
      }).unwrap()) as any;
      setShow(true);
      setmessage(add?.message);

      setTimeout(() => {
        setShow(false);
        props.navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);

      setErrTenChuVu('Trường tên là bắt buộc');
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'CHỨC VỤ'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width * 0.9}}>
          <TextInputcustom
            value={tenchucVu}
            setValue={(val: string) => setTenChuVu(val)}
            placeholder={'Nhập tên chức vụ'}
            icon="account-tie"
          />
          {errtenchucVu && <Text style={stylescustom.err}>{errtenchucVu}</Text>}
          <TextInputcustom
            value={mota}
            setValue={(val: string) => setMotas(val)}
            placeholder={'Nhập mô tả'}
            icon="content-paste"
            muntiline
            numberOfLines={5}
          />
          <View style={styles.btn}>
            <BuntomCustom1 text="Lưu" onpress={check} isLoading={isLoading} />
          </View>
        </View>
      </View>
      <ModalDelete val={message} isShow={show} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {width: sizes._screen_width * 0.9, marginTop: sizes._25sdp},
});
