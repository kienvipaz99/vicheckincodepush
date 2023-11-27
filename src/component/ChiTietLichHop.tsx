import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import fonts from '../res/fonts';
import images from '../res/images';
import sizes from '../res/sizes';
import stylescustom from '../res/stylescustom';
import Header from './Header';
import {fullday} from '../data/checkday';
import colors from '../res/color';
import {FlatList} from 'react-native-gesture-handler';
import DanhSachThamGia from './renderItem/DanhSachThamGia';
import {NavigationProp} from '@react-navigation/native';
interface ChiTietLichHopProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}

const ChiTietLichHop = (props: ChiTietLichHopProps) => {
  let a = props.route?.params?.item;

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'CHI TIẾT LỊCH HỌP'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={styles.item}>
          <View style={styles.item1}>
            <Text style={styles.txt1}>Thông tin cuộc họp</Text>
            <Text
              style={[
                styles.txt3,
                {
                  color:
                    a.mucdo == 'Quan trọng'
                      ? '#CC5F00'
                      : a.mucdo == 'Bình thường'
                      ? '#020202'
                      : a.mucdo == 'Đặc biệt quan trọng'
                      ? '#4109DF'
                      : undefined,
                },
              ]}>
              {a.mucdo}
            </Text>
          </View>
          <Text style={styles.txt3}>{a.content}</Text>
          <View style={styles.item3}>
            <View style={styles.item2}>
              <View style={styles.img}>
                <Image source={images.thoigian} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Thời gian</Text>
                <View style={styles.item2}>
                  <Text style={styles.txt3}>{fullday(a.day)}</Text>
                  <Text style={[styles.txt3, {marginLeft: 15}]}>{a.time}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gach} />
            <View style={styles.item2}>
              <View style={styles.img}>
                <Image source={images.phonghop} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Phòng họp</Text>
                <View style={styles.item2}>
                  <Text style={styles.txt3}>{a.title}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gach} />
            <View style={styles.item2}>
              <View style={styles.img}>
                <Image source={images.chutri} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Chủ trì</Text>
                <View style={styles.item2}>
                  <Text style={[styles.txt3, {color: 'black', fontFamily: fonts.textRegular}]}>
                    {a.nguoitruchi}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.gach} />
            <View style={styles.item2}>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Nội dung</Text>
                <View style={styles.item2}>
                  <Text style={styles.txt3}>{a.content}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: sizes._20sdp}}>
            <Text style={styles.txt3}>Thành viên ({a.thanhvien.length})</Text>
            <FlatList
              scrollEnabled={false}
              data={a.thanhvien}
              numColumns={2}
              renderItem={({item, index}) => {
                return <DanhSachThamGia item={item} index={index} />;
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChiTietLichHop;

const styles = StyleSheet.create({
  txt1: {
    color: '#6C6A6A',
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_big,
  },

  txt3: {
    color: '#6C6A6A',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },

  item: {
    width: '90%',

    marginTop: sizes._20sdp,
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: sizes._15sdp,
  },
  img: {width: sizes._screen_width * 0.05, marginLeft: sizes._10sdp},
  item3: {
    marginTop: sizes._20sdp,
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  gach: {
    height: 1,
    width: '100%',
    backgroundColor: '#D4D3D3',
    marginTop: 5,
  },
});
