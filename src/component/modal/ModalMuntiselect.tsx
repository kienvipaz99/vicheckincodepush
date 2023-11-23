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
import {useGetuserQuery} from '../../redux/api/auth.api';
import {ActivityIndicator} from 'react-native';
import fonts from '../../res/fonts';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  select?: any;
  item?: string[] | undefined;
  name: string;
}
const ModalMuntiselect = (props: Props) => {
  const [perpage, setPerPage] = useState(20);
  const {data, refetch, isFetching} = useGetuserQuery(`?per_page=${perpage}`);

  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const [datas, setDatas] = useState<any>();
  useEffect(() => {
    let temp = data?.data.map((item: any) => {
      return {...item, isChecked: false};
    });
    setDatas(temp);
  }, [data]);
  const handleChange = (val: any) => {
    let temp = datas.map((item: any) => {
      if (val === item.id) {
        return {...item, isChecked: !item.isChecked};
      }
      return item;
    });
    setDatas(temp);
  };
  let selected = datas?.filter((product: any) => product?.isChecked);
  const luu = () => {
    props.select(selected);
    props.toggleDate();
  };

  const renderitem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.view}
        activeOpacity={1}
        onPress={() => {
          handleChange(item.id);
        }}>
        <MaterialCommunityIcons
          size={25}
          name={item.isChecked === false ? 'check-circle-outline' : 'check-circle'}
          color={item.isChecked === false ? colors.colorDargrey : 'red'}
        />
        <Text style={styles.txt1}>{item?.full_name}</Text>
      </TouchableOpacity>
    );
  };

  const LoadingIndicator = () => {
    return isFetching && <ActivityIndicator size="large" color="#0000ff" />;
  };
  const renderContent = () => (
    <View style={styles.content1}>
      <View style={styles.view3}>
        <Text style={styles.txt}>{props.name}</Text>
        <Text style={styles.txt} onPress={luu}>
          Lưu
        </Text>
      </View>

      <View style={styles.view1}>
        <FlatList
          data={datas}
          renderItem={renderitem}
          keyExtractor={(item: any) => item.id?.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={refetch}
          onEndReachedThreshold={0.7}
          onEndReached={handleEndReached}
          removeClippedSubviews
          ListFooterComponent={<LoadingIndicator />}
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
            <View style={styles.view2} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default memo(ModalMuntiselect);
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
  },
  content1: {
    width: sizes._screen_width * 0.8,
    borderRadius: sizes._20sdp,
    height: sizes._screen_height * 0.6,
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
  txt: {
    color: 'white',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textBold,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    width: sizes._csreen_width / 1.4,
    marginTop: sizes._15sdp,
    borderRadius: 10,
    height: sizes._40sdp,
  },
  view1: {
    width: sizes._screen_width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizes._70sdp,
    marginTop: 20,
    alignSelf: 'center',
  },
  view3: {
    width: '100%',
    padding: 10,
    backgroundColor: '#11459d',
    borderTopLeftRadius: sizes._20sdp,
    borderTopRightRadius: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt1: {marginLeft: sizes._40sdp, color: 'black'},
  view2: {zIndex: 0, flex: 1, height: '100%', width: '100%'},
});
