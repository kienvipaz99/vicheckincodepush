import React, {useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetuserQuery} from '../../redux/api/auth.api';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  select?: any;

  name: string;
  search?: boolean;
}
const Modalselectuser = (props: Props) => {
  const [check, setCheck] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [perpage, setPerPage] = useState(20);
  const {data, isLoading, refetch, isFetching} = useGetuserQuery(
    `?per_page=${perpage}&search=${searchQuery}`,
  );

  useEffect(() => {
    refetch();
  }, [searchQuery]);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const renderitem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.view}
        activeOpacity={1}
        onPress={() => {
          setCheck(item?.id);
          props.toggleDate();
          props.select({
            id: item.id,
            full_name: item.full_name,
          });
        }}>
        <MaterialCommunityIcons
          style={{marginLeft: 15}}
          size={25}
          name={check === item.id ? 'check-circle' : 'check-circle-outline'}
          color={check === item.id ? 'red' : colors.colorDargrey}
        />
        <Text style={{marginLeft: sizes._40sdp, color: 'black'}}>{item.full_name}</Text>
      </TouchableOpacity>
    );
  };
  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.view1}>
        <Text style={styles.txt}>{props.name}</Text>
      </View>
      {props.search ? (
        <Searchbar
          inputStyle={{height: sizes._55sdp}}
          style={styles.search}
          placeholder="Tìm kiếm nhân viên"
          onChangeText={setSearchQuery}
          icon={'account-search'}
          value={searchQuery}
          cursorColor={'black'}
          onSubmitEditing={() => console.log('oke')}
        />
      ) : null}
      <FlatList
        data={data?.data}
        renderItem={renderitem}
        style={styles.fl}
        keyExtractor={(item: any) => item?.id?.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        refreshing={isFetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.7}
        onEndReached={handleEndReached}
        removeClippedSubviews
      />
    </View>
  );

  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback onPress={props.toggleDate}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default memo(Modalselectuser);
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes._screen_width * 0.8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._20sdp,
    position: 'absolute',
    height: 500,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
  },
  search: {
    width: '95%',
    marginTop: sizes._25sdp,
    height: sizes._45sdp,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    width: '90%',
    marginTop: sizes._15sdp,
    borderRadius: sizes._10sdp,
    alignSelf: 'center',
    height: 40,
  },
  view1: {
    width: '100%',
    padding: 10,
    backgroundColor: '#11459d',
    borderTopLeftRadius: sizes._20sdp,
    borderTopRightRadius: sizes._20sdp,
    height: 40,
  },
  txt: {
    color: 'white',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textBold,
  },
  fl: {height: 400, width: '100%', marginTop: 10, marginBottom: 15},
});
