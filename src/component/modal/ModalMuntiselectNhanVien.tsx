import React, {useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import sizes from '../../res/sizes';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../res/color';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import axios from 'axios';
import URI from '../../URI';
import fonts from '../../res/fonts';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  select?: any;
  name: string;
  search?: boolean;
}
const ModalMuntiselectNhanVien = (props: Props) => {
  const useAppSelect: TypedUseSelectorHook<any> = useSelector;
  const key: string = useAppSelect(data => data.keytoken.key);
  const [data, setData] = useState<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectID, setSelectID] = useState<any>([]);
  const getdata = async () => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${key}`,
      },
    };
    await axios
      .get(`${URI}/api/v1/employees?per_page=1000&search=${searchQuery}`, config)
      .then(function (res) {
        setData(res.data.data);
      });
  };

  useEffect(() => {
    getdata();
  }, [searchQuery]);
  const Selects = (val: any) => {
    setSelectID((prevSelectID: any) => {
      if (prevSelectID.includes(val)) {
        return prevSelectID.filter((id: any) => id !== val);
      } else {
        return [...prevSelectID, val];
      }
    });
  };
  const luu = () => {
    props.select(selectID);
    props.toggleDate();
  };
  const renderitem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFEFD5',
          width: sizes._csreen_width / 1.4,
          marginTop: sizes._15sdp,
          borderRadius: 10,
          height: sizes._40sdp,
        }}
        activeOpacity={1}
        onPress={() => {
          Selects(item.id);
        }}>
        <MaterialCommunityIcons
          style={{marginLeft: 15}}
          size={25}
          name={selectID.includes(item.id) ? 'check-circle' : 'check-circle-outline'}
          color={selectID.includes(item.id) ? 'red' : colors.colorDargrey}
        />
        <Text style={{marginLeft: sizes._40sdp, color: 'black'}}>{item.full_name}</Text>
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.txt}>{props.name}</Text>
        <Text style={styles.txt} onPress={luu}>
          Lưu
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: sizes._30sdp,
        }}>
        <FlatList
          data={data}
          renderItem={renderitem}
          keyExtractor={(item: any) => item.id?.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
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
export default ModalMuntiselectNhanVien;
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
  txt: {
    color: 'white',
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.textBold,
  },
});
