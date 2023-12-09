import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import fonts from '../res/fonts';
import images from '../res/images';
import sizes from '../res/sizes';
import stylescustom from '../res/stylescustom';
import Header from './Header';
import {consvertTime, fullday} from '../data/checkday';
import {FlatList} from 'react-native-gesture-handler';
import DanhSachThamGia from './renderItem/DanhSachThamGia';
import {NavigationProp} from '@react-navigation/native';
import colors from '../res/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DowLoadfileMeeting from '../screen/meetings/DowLoadfileMeeting';
interface ChiTietLichHopProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const ChiTietLichHop = (props: ChiTietLichHopProps) => {
  let a = props.route?.params?.item as RoomMeeting;
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
                    a?.level == 'important'
                      ? '#CC5F00'
                      : a?.level == 'normal'
                      ? '#020202'
                      : undefined,
                },
              ]}>
              {a?.level == 'important' ? 'Quan trọng' : a?.level == 'normal' ? 'Bình thường' : null}
            </Text>
          </View>
          <Text style={[styles.txt3, {marginTop: 10}]}>{a?.title}</Text>
          <View style={styles.item3}>
            <View style={styles.item2}>
              <View style={styles.img}>
                <Image source={images.thoigian} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Thời gian</Text>
                <View style={styles.item2}>
                  <Text style={styles.txt3}>{fullday(a?.day)}</Text>
                  <Text style={[styles.txt3, {marginLeft: 15}]}>
                    {consvertTime(a?.time_start)}-{consvertTime(a?.time_end)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.gach} />
            {a?.room?.name && (
              <>
                <View style={styles.item2}>
                  <View style={styles.img}>
                    <Image source={images.phonghop} />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.txt3}>Phòng họp</Text>
                    <View style={styles.item2}>
                      <Text style={styles.txt3}>{a?.room?.name}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.gach} />
              </>
            )}
            {a?.link && (
              <>
                <View style={styles.item2}>
                  <MaterialCommunityIcons
                    size={30}
                    color={colors.colorDargrey}
                    name="link"
                    style={{marginLeft: 5}}
                  />
                  <View style={{marginLeft: 7}}>
                    <Text style={styles.txt3}>Link phòng họp</Text>
                    <View style={styles.item2}>
                      <Text style={styles.txt3}>{a?.link}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.gach} />
              </>
            )}
            <View style={styles.item2}>
              <View style={styles.img}>
                <Image source={images.chutri} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Chủ trì</Text>
                <View style={styles.item2}>
                  <Text style={[styles.txt3, {color: 'black', fontFamily: fonts.textRegular}]}>
                    {a?.host}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.gach} />
            <View style={styles.item2}>
              <View style={{marginLeft: 10}}>
                <Text style={styles.txt3}>Nội dung</Text>
                <View style={styles.item2}>
                  <Text style={styles.txt3}>{a?.content}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: sizes._20sdp}}>
            <View>
              <Text style={styles.txt3}>File cuộc họp</Text>
              {a?.slice_content?.map((item, index) => {
                return <DowLoadfileMeeting item={item} index={index} />;
              })}
            </View>
            <Text style={[styles.txt3, {marginTop: 20}]}>
              Thành viên ({a?.members?.length ? a?.members?.length : '0'})
            </Text>
            <FlatList
              scrollEnabled={false}
              data={a?.members}
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
    color: colors.colorText,
    fontFamily: fonts.textBold,
    fontSize: sizes.width * 0.045,
  },

  txt3: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
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
    borderRadius: 10,
    backgroundColor: 'white',
    ...stylescustom.shadowitem,
  },
  gach: {
    height: 1,
    width: '100%',
    backgroundColor: '#D4D3D3',
    marginTop: 5,
  },
});
