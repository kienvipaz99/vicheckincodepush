import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import TopTabYeuCau from '../container/TopTabYeuCau';
import colors from '../res/color';
import {NavigationProp} from '@react-navigation/native';
import ModalRequest from '../component/modal/ModalRequest';
import {selectTime} from '../data/itemdontu/itemloaidon';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const SingleWord = (props: Props) => {
  const [show, setShow] = useState(false);
  const [pick, setPick] = useState(5);
  const [pickid, setPickId] = useState<number>();

  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'QUẢN LÝ ĐƠN TỪ'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
        setting
        onSettingPress={() => setShow(true)}
      />
      <View style={styles.contentContainer}>
        <TopTabYeuCau
          navigation={props.navigation}
          fillter={selectTime[pick - 1]?.key}
          pickid={pickid}
        />
      </View>
      <ModalRequest
        isShow={show}
        searchitem
        setShow={() => setShow(false)}
        pick={pick}
        setPick={setPick}
        key={'ModalRequest12'}
        pickid={setPickId}
      />
    </View>
  );
};
export default SingleWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.colorWhite,
    flex: 1,
    marginTop: 20,
  },
});
