import React, {useState, memo} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import sizes from '../../res/sizes';
import {FlatList} from 'react-native-gesture-handler';
import fonts from '../../res/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../res/color';
import {Gender} from '../../res/convert';

interface Props {
  isShow: boolean;
  toggleDate: () => void;
  select?: any;
  item: any;
  name: string;
  search?: boolean;
}
const Modalselect = (props: Props) => {
  const [check, setCheck] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  const renderitem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFEFD5',
          width: '90%',
          marginTop: sizes._15sdp,
          borderRadius: sizes._10sdp,
          alignSelf: 'center',
          height: 40,
        }}
        activeOpacity={1}
        onPress={() => {
          setCheck(item?.id);
          props.toggleDate();
          props.select({
            id: item.id,
            name: item.name,
            key: item?.key,
          });
        }}>
        <MaterialCommunityIcons
          style={{marginLeft: 15}}
          size={25}
          name={check === item.id ? 'check-circle' : 'check-circle-outline'}
          color={check === item.id ? 'red' : colors.colorDargrey}
        />
        <Text style={{marginLeft: sizes._40sdp, color: 'black'}}>{Gender(item.name)}</Text>
      </TouchableOpacity>
    );
  };
  const renderContent = () => (
    <View style={styles.content}>
      <View
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#11459d',
          borderTopLeftRadius: sizes._20sdp,
          borderTopRightRadius: sizes._20sdp,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: sizes._font_size_big_big,
            fontFamily: fonts.textBold,
          }}>
          {props.name}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: sizes._40sdp,
        }}>
        {props.search ? (
          <Searchbar
            inputStyle={{height: sizes._45sdp}}
            style={styles.search}
            placeholder="Tìm kiếm nhân viên"
            onChangeText={onChangeSearch}
            icon={'account-search'}
            value={searchQuery}
            cursorColor={'black'}
            onSubmitEditing={() => console.log('oke')}
          />
        ) : null}
        <FlatList
          data={props.item}
          renderItem={renderitem}
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: 400}}
          keyExtractor={(item: any) => item.id?.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      </View>
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
export default memo(Modalselect);
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
  search: {width: '90%', marginTop: sizes._25sdp, height: sizes._45sdp},
});
