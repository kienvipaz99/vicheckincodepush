import {FlatList, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../../res/fonts';
import {consvertTime} from '../../../data/checkday';
import {NavigationProp} from '@react-navigation/native';
import images from '../../../res/images';
import Loading from '../../../component/Loading';
import {
  useDeleteWorkingShiftsMutation,
  useGetAllWorkingShiftsQuery,
} from '../../../redux/api/auth.api';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
export default function CaLamViec(props: Props) {
  const {data, isLoading, refetch} = useGetAllWorkingShiftsQuery('');

  const [deleteItem, {isLoading: deleteLoading}] = useDeleteWorkingShiftsMutation();
  const deleteitem = async (val: number) => {
    try {
      await deleteItem(val).unwrap();
      Alert.alert('Xoá thành công');
      refetch();
    } catch (error) {
      Alert.alert('Xoá thất bại');
    }
  };
  const renderItem = ({item, index}: {item: WorkingShift; index: number}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => props.navigation.navigate('ThemCaLamViec', {item})}>
        <MaterialIcons name="lock-clock" size={30} color={'black'} />
        <View
          style={{
            width: sizes._screen_width * 0.66,
            marginLeft: sizes._15sdp,
          }}>
          <Text style={styles.text}>{item?.name}</Text>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.text1}>Thời gian bắt đầu: </Text>
            <View style={stylescustom.row1}>
              <Icon name="briefcase-clock" color={'black'} size={20} />
              <Text style={styles.text1}>{item?.start_at && consvertTime(item?.start_at)}</Text>
            </View>
          </View>
          <View style={styles.gach} />
          <View style={styles.item1}>
            <Text style={styles.text1}>Thời gian kết thúc: </Text>
            <View style={stylescustom.row1}>
              <Icon name="clock-check" color={'black'} size={20} />
              <Text style={styles.text1}>{item?.end_at && consvertTime(item?.end_at)}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            deleteitem(item.id);
          }}
          style={{marginRight: 10}}>
          <Image source={images.xoa} style={{height: 35, width: 35}} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'QUẢN LÝ CA LÀM VIỆC'}
        back
        onBackPress={() => props.navigation.goBack()}
        iconadd
        rightContent
        opressadd={() => props.navigation.navigate('ThemCaLamViec')}
      />
      <View style={stylescustom.contentContainer}>
        <FlatList
          data={data?.data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            width: sizes._screen_width,
            alignItems: 'center',
            paddingBottom: 20,
          }}
        />
      </View>
      {(isLoading || deleteLoading) && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: sizes._screen_width * 0.9,
    backgroundColor: colors.colorWhite,
    borderRadius: 10,
    marginTop: sizes._20sdp,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textitalic,

    marginBottom: 2,
  },
  text1: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big_big,
    marginLeft: 4,
    fontFamily: fonts.textRegular,
    width: sizes._screen_width * 0.43,
  },
  gach: {
    backgroundColor: colors.colorblack,
    opacity: 0.2,
    width: '100%',
    height: 1,
  },
  item1: {
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignContent: 'center',
  },
});
