import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../res/color';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {selectTime} from '../../data/itemdontu/itemloaidon';
import {useGetuserQuery} from '../../redux/api/auth.api';
import stylescustom from '../../res/stylescustom';
import {Pressable} from 'react-native';
const ModalRequest = ({
  isShow,
  setShow,
  pick,
  setPick,
  searchitem,
  pickid,
}: {
  isShow: boolean;
  setShow: () => void;
  pick: number;
  setPick: (val: number) => void;
  searchitem?: boolean;
  pickid: (val: number) => void;
}) => {
  const [search, setSearch] = useState('');
  const RenderItem = ({item}: {item: {id: number; name: string}}) => {
    return (
      <View style={styles.view1} key={item?.id + '123'}>
        <Icon
          name={pick == item?.id ? 'checkbox' : 'checkbox-outline'}
          color={colors.colorOrange}
          size={25}
          onPress={() => {
            setPick(item?.id);
          }}
        />
        <Text style={styles.txt1}>{item?.name}</Text>
      </View>
    );
  };
  const [showsearch, setshowsearch] = useState(false);
  const {data, refetch, isLoading} = useGetuserQuery(`?per_page=10&search=${search}`);
  useEffect(() => {
    refetch();
  }, [search]);
  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.txt}>Bộ lọc thời gian</Text>
      </View>
      <View style={styles.view}>
        {searchitem && (
          <TextInput
            placeholder="Tìm kiếm nhân viên"
            style={styles.textinput}
            onChangeText={setSearch}
            value={search}
            cursorColor={colors.colorText}
            selectionColor={colors.colorText}
          />
        )}

        {data?.data?.length !== 0 && (
          <View style={styles.view2}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data?.data?.map((item: User) => {
                return (
                  <Pressable
                    key={'cccc' + item?.id}
                    style={styles.btn}
                    onPress={() => {
                      setSearch(item?.full_name);
                      pickid(item?.id);
                    }}>
                    <Text>{item?.full_name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        <FlatList
          data={selectTime}
          renderItem={({item}) => <RenderItem item={item} />}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );

  return (
    <View>
      <Modal visible={isShow} animationType="fade" transparent={true} statusBarTranslucent={true}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={setShow}>
            <View style={{width: '100%', flex: 1, zIndex: 0}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderHeader()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
  },
  content: {
    marginBottom: sizes._25sdp,
    width: sizes.width * 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._8sdp,
    position: 'absolute',
  },

  toast: {
    color: '#212121',
    fontWeight: '400',
    fontSize: 14,
  },
  txt: {
    color: 'white',
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.textBold,
    alignSelf: 'center',
  },
  header: {
    width: sizes.width * 0.6,
    padding: 10,
    backgroundColor: '#11459d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  view: {
    width: sizes.width * 0.6,
    backgroundColor: colors.colorWhite,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  txt1: {
    marginLeft: 50,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  textinput: {
    height: 40,
    width: sizes.width * 0.5,
    borderRadius: 10,
    borderColor: colors.colorDargrey,
    borderWidth: 1,
    padding: 8,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  btn: {
    height: 30,
    justifyContent: 'center',
    borderBottomColor: colors.colorDargrey,
    borderBottomWidth: 1,
  },
  view2: {
    backgroundColor: colors.colorWhite,
    padding: 10,
    ...stylescustom.shadowitem,
    marginTop: 10,
    borderRadius: 15,
    maxHeight: 200,
  },
});
