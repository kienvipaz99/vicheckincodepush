import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import Header from '../../../component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stylescustom from '../../../res/stylescustom';
import fonts from '../../../res/fonts';
import {useGetdepartmentsQuery} from '../../../redux/api/auth.api';
import Loading from '../../../component/Loading';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const PhongBan = (props: Props) => {
  const {data: departments, isLoading, refetch} = useGetdepartmentsQuery('');
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  const timeoutIdRef: any = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const renderItem = ({item, index}: {item: Departments; index: number}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() =>
          props.navigation.navigate('AddPhongban', {
            data: item,
            id: 1,
          })
        }>
        <View style={stylescustom.row1}>
          <MaterialIcons name="adjust" size={20} color={'black'} />
          <View style={styles.item2}>
            <Text style={styles.text}>{item?.name}</Text>
            {item?.description && <Text style={styles.text1}>{item?.description}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        back
        onBackPress={() => props.navigation.goBack()}
        title
        textTittle={'QUẢN LÝ PHÒNG BAN'}
        rightContent
        iconadd
        opressadd={() =>
          props.navigation.navigate('AddPhongban', {
            id: 2,
          })
        }
      />

      <View style={stylescustom.contentContainer}>
        <FlatList
          data={departments?.data}
          renderItem={renderItem}
          contentContainerStyle={styles.view}
          keyExtractor={item => `${item?.id}`}
          removeClippedSubviews
          maxToRenderPerBatch={10}
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
};

export default PhongBan;

const styles = StyleSheet.create({
  item: {
    height: sizes._screen_height * 0.08,
    backgroundColor: colors.colorWhite,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    marginTop: sizes._screen_height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: sizes._15sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'space-between',
  },
  item2: {
    marginLeft: 20,
  },
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  text1: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  view: {
    width: sizes._screen_width,
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
});
