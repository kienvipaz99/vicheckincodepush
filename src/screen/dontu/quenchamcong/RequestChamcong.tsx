import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import stylescustom from '../../../res/stylescustom';
import colors from '../../../res/color';
import {chuyenDoiThoiGian} from '../../../data/checkday';
import fonts from '../../../res/fonts';
import {Pressable} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import images from '../../../res/images';
export default function RequestChamcong({
  data,
  status,
  navigation,
  duyetdon,
}: {
  data?: attendanceRequest[];
  status: 'yêu cầu' | 'từ chối';
  duyetdon?: boolean;
  navigation: NavigationProp<Record<string, any>>;
}) {
  const RenderItem = ({item, index}: {item: attendanceRequest; index: number}) => {
    return (
      <Pressable
        style={styles.view}
        onPress={() => navigation.navigate('DonQuenChamCong', {item, duyetdon})}>
        <Text style={styles.title}>{index + 1}. Đơn quên chấm công</Text>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Người gửi:</Text>
          <Text style={styles.txt}>{item?.user?.full_name}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Ngày:</Text>
          <Text style={styles.txt}>{item?.in_date}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Chấm công vào:</Text>
          <Text style={styles.txt}>{chuyenDoiThoiGian(item?.details[0]?.in_time)}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Chấm công ra:</Text>
          <Text style={styles.txt}>{chuyenDoiThoiGian(item?.details[0]?.out_time)}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Nội dung:</Text>
          <Text style={styles.txt}>{item?.details[0]?.comments[0]?.comment}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text style={styles.txt}>Trạng thái:</Text>
          <Text style={styles.txt}>{item?.details[0]?.status?.translated_name}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1}}>
      {data?.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={({item, index}: {item: attendanceRequest; index: number}) => (
            <RenderItem item={item} index={index} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Image source={images.notData} style={styles.img} />
          <Text style={[styles.txt, {marginTop: 20}]}>Không có dữ liệu </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    padding: 10,
    borderRadius: 15,
    ...stylescustom.shadowitem,
    backgroundColor: colors.colorWhite,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    color: colors.colorBlue,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
  },
  txt: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  img: {
    width: sizes.width * 0.5,
    height: sizes.width * 0.5,
    marginTop: 20,
  },
});
