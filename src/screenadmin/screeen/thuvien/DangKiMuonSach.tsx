import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import ButonCustom from '../../../component/ButonCustom';
import Header from '../../../component/Header';
import TextInputcustom from '../../../component/TextInputcustom';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import stylescustom from '../../../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';

interface DangKiMuonSachProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}

const DangKiMuonSach = (props: DangKiMuonSachProps) => {
  const [sdt, setSDT] = React.useState('');
  const [ten, setTen] = React.useState('');

  const [ngaymuon, setNgaymuon] = React.useState('Chọn ngày');

  const [ngaytra, setNgaytra] = React.useState('Chọn ngày');

  const item = props.route.params.item;
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Đăng ký mượn sách'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={styles.item}>
          <View style={styles.item1}>
            <Text style={styles.txt}>Tên sách</Text>
            <Text style={styles.txt}>{item.name}</Text>
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.txt}>Người mượn</Text>
            {item.nguoimuon == '' ? (
              <TextInput
                placeholder="Nhập tên"
                cursorColor={'black'}
                value={ten}
                style={{
                  fontSize: sizes._font_size_max,
                  fontWeight: '500',
                  color: 'black',
                  width: sizes._screen_width * 0.4,
                  opacity: 0.6,
                  textAlign: 'right',
                }}
                onChangeText={(val: any) => {
                  setTen(val);
                }}
              />
            ) : (
              <Text style={styles.txt}>{item.nguoimuon}</Text>
            )}
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.txt}>Trạng thái</Text>
            <Text style={styles.txt}>{item.trangthai}</Text>
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.txt}>Ngày mượn</Text>
            {item.ngaymuon == '' ? (
              <Text style={styles.txt}>{ngaymuon}</Text>
            ) : (
              <Text style={styles.txt}>{item.ngaymuon}</Text>
            )}
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.txt}>Ngày trả</Text>
            {item.ngaytra == '' ? (
              <Text style={styles.txt}>{ngaytra}</Text>
            ) : (
              <Text style={styles.txt}>{item.ngaytra}</Text>
            )}
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.txt}>Số điện thoại</Text>
            {item.sdt == '' ? (
              <TextInput
                placeholder="Số điện thoại"
                maxLength={10}
                cursorColor={'black'}
                value={sdt}
                style={{
                  fontSize: sizes._font_size_max,
                  fontWeight: '500',
                  color: 'black',
                  textAlign: 'right',
                  opacity: 0.6,
                }}
                keyboardType={'numeric'}
                onChangeText={(val: any) => {
                  setSDT(val);
                }}
              />
            ) : (
              <Text style={styles.txt}>{item.sdt}</Text>
            )}
          </View>
          <View style={styles.gach} />
        </View>
        <View style={{width: sizes._screen_width * 0.95, marginTop: sizes._30sdp}}>
          <ButonCustom
            Opress={() => {
              props.navigation.goBack();
            }}
            Textbtn={'Đăng kí'}
          />
        </View>
      </View>
    </View>
  );
};

export default DangKiMuonSach;

const styles = StyleSheet.create({
  item: {
    width: sizes._screen_width * 0.95,
    backgroundColor: colors.colorOrange1,
    borderRadius: 10,
    marginTop: sizes._25sdp,
    paddingBottom: 30,
  },
  txt: {
    color: colors.colorblack,
    fontSize: sizes._font_size_max,
    fontWeight: '500',
    opacity: 0.6,
  },
  gach: {
    backgroundColor: colors.colorblack,
    opacity: 0.2,
    width: '100%',
    height: 1,
    marginTop: 5,
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 25,
  },
});
