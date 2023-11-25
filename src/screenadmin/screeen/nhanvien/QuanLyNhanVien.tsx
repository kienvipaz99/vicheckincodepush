import {StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Searchbar} from 'react-native-paper';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import fonts from '../../../res/fonts';
import images from '../../../res/images';
import Loading from '../../../component/Loading';
import ModalDelete from '../../../component/modal/ModalDelete';
import ModalFalse from '../../../component/modal/ModalFalse';
import {txt} from '../../../res/convert';
import {useDeleteuserMutation, useGetuserQuery} from '../../../redux/api/auth.api';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function QuanLyNhanVien(props: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [perpage, setPerPage] = useState(20);
  const {data, isLoading, refetch, isFetching} = useGetuserQuery(
    `?per_page=${perpage}&search=${searchQuery}`,
  );
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalFalse, setShowModalFalse] = useState(false);
  const [deleteUser, {isLoading: loadingdelete}] = useDeleteuserMutation();
  const timeoutIdRef: any = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const deleteItem = async (id: number) => {
    try {
      const deletes = (await deleteUser(id).unwrap()) as any;
      setMessage(deletes?.data?.message);
      setShowModalFalse(true);
      timeoutIdRef.current = setTimeout(() => {
        setShowModalFalse(false);
      }, 3000);
      refetch();
    } catch (error: any) {
      setShowModalDelete(true);
      setErrMessage(error?.data?.message);

      timeoutIdRef.current = setTimeout(() => {
        setShowModalDelete(false);
      }, 3000);
      console.log(error);
    }
  };
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };

  const renderItem = ({item, index}: {item: User; index: number}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() =>
          props.navigation.navigate('NhanVien', {
            data: item?.id,
          })
        }>
        <View style={styles.item}>
          <View style={stylescustom.row1}>
            <Text style={styles.text}>{index + 1}</Text>
            <Image
              source={
                item?.profile_picture?.full_url
                  ? {uri: item?.profile_picture?.full_url}
                  : images.iconuser1
              }
              style={styles.img}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.text1}>{txt(item.full_name)}</Text>
              <Text style={styles.text2}>{item.email}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteItem(item.id)} style={{marginRight: 10}}>
          <Image source={images.xoa} style={styles.img1} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'QUẢN LÝ NHÂN VIÊN'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
        iconadd
        opressadd={() => props.navigation.navigate('ThemNhanVien')}
      />
      <View style={stylescustom.contentContainer}>
        <Searchbar
          inputStyle={{height: sizes._50sdp}}
          style={styles.search}
          placeholder="Tìm kiếm nhân viên"
          onChangeText={setSearchQuery}
          icon={'account-search'}
          value={searchQuery}
          cursorColor={'black'}
        />
        <FlatList
          key={'1'}
          data={data?.data}
          renderItem={renderItem}
          refreshing={isFetching}
          onRefresh={refetch}
          removeClippedSubviews={true}
          maxToRenderPerBatch={15}
          initialNumToRender={15}
          onEndReachedThreshold={0.7}
          onEndReached={handleEndReached}
          style={{marginTop: 20}}
          contentContainerStyle={{
            width: sizes._screen_width,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {(isLoading || loadingdelete) && <Loading />}
      <ModalDelete val={message} isShow={showModalFalse} />
      <ModalFalse val={errMessage} isShow={showModalDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    width: '90%',
    marginTop: sizes._25sdp,
    height: sizes._50sdp,
    fontFamily: fonts.textRegular,
  },
  text: {
    marginLeft: sizes._20sdp,
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
  text2: {color: 'black', fontFamily: fonts.textRegular},
  text1: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  card: {
    borderRadius: sizes._15sdp,
    width: sizes._screen_width * 0.9,
    backgroundColor: colors.colorWhite,
    marginBottom: sizes._20sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  img: {
    height: sizes._40sdp,
    width: sizes._40sdp,
    borderRadius: 40,
    marginLeft: 10,
  },
  item1: {
    height: sizes._35sdp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
    marginBottom: 20,
  },
  img1: {height: 35, width: 35},
});
