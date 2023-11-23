import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import ButonCustom from '../../../component/ButonCustom';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function ThemPhongHoc(props: Props) {
  const [namephonghop, setNamePhongHop] = useState('');
  const [soGhe, setSoGhe] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Thêm phòng họp'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <TextInputcustom
          icon="pencil-box"
          placeholder={'Nhập tên phòng họp'}
          value={namephonghop}
          setValue={(val: any) => setNamePhongHop(val)}
        />
        <TextInputcustom
          icon="pencil-box"
          placeholder={'Nhập số ghê'}
          value={soGhe}
          setValue={(val: any) => setSoGhe(val)}
        />
        <TextInputcustom
          icon="pencil-box"
          placeholder={'Ghi chú'}
          value={ghiChu}
          setValue={(val: any) => setGhiChu(val)}
        />
        <View style={{width: '90%', marginTop: 30}}>
          <ButonCustom Opress={() => props.navigation.goBack()} Textbtn={'Lưu'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
