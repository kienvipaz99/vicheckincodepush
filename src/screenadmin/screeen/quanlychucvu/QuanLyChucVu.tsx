import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fonts from '../../../res/fonts';
import images from '../../../res/images';
import ModalDelete from '../../../component/modal/ModalDelete';
import ModalFalse from '../../../component/modal/ModalFalse';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import Loading from '../../../component/Loading';
import {useDeletedesignationsMutation, useGetdesignationsQuery} from '../../../redux/api/auth.api';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function QuanLyChucVu(props: Props) {
  const [message, setmessage] = useState('');
  const [show, setShow] = useState(false);
  const [errmessage, setErrmessage] = useState('');
  const [show1, setShow1] = useState(false);
  const {data, refetch, isLoading} = useGetdesignationsQuery('');
  const timeoutIdRef: any = useRef();
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  const [deletes, {isLoading: loadingDelete}] = useDeletedesignationsMutation();
  const deleteitem = async (val: number) => {
    try {
      const deleteItem = (await deletes(val).unwrap()) as any;
      setmessage(deleteItem?.message);
      setShow(true);
      refetch();
      timeoutIdRef.current = setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (error) {
      let errors = error as Errors;
      setErrmessage(errors?.data?.message);
      setShow1(true);
      timeoutIdRef.current = setTimeout(() => {
        setShow1(false);
      }, 3000);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props.navigation.navigate('SuaChucVu', {
            data: {
              name: item.name,
              mota: item.description,
              id: item.id,
            },
          })
        }>
        <View style={[stylescustom.row1, {}]}>
          <MaterialIcons name="adjust" size={20} color={'black'} />
          <View style={{marginLeft: sizes._10sdp, width: '80%'}}>
            <Text style={styles.text}>{item.name}</Text>
            {item.description ? <Text style={styles.text1}>{item.description}</Text> : null}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            deleteitem(item.id);
          }}
          style={{}}>
          <Image source={images.xoa} style={{height: 35, width: 35}} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'QUẢN lý chức vụ'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
        iconadd
        opressadd={() => props.navigation.navigate('Themchucvu')}
      />
      <View style={stylescustom.contentContainer}>
        <FlatList
          bounces={false}
          data={data?.data}
          renderItem={renderItem}
          contentContainerStyle={styles.view}
        />
      </View>
      {(isLoading || loadingDelete) && <Loading />}
      <ModalDelete val={message} isShow={show} />
      <ModalFalse val={errmessage} isShow={show1} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  text1: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
  },
  item: {
    width: sizes._screen_width * 0.9,
    backgroundColor: colors.colorWhite,
    borderRadius: 10,
    padding: 8,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  view: {
    width: sizes._screen_width,
    alignItems: 'center',
    paddingBottom: 20,
  },
});
