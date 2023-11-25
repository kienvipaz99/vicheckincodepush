import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../component/Header';
import TopTab from '../container/TopTab';
import colors from '../res/color';
import {NavigationProp} from '@react-navigation/native';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import {selectTime} from '../data/itemdontu/itemloaidon';
import ModalRequest from '../component/modal/ModalRequest';

interface RequestManagementProps {
  navigation: NavigationProp<Record<string, any>>;
}
const RequestManagement = (props: RequestManagementProps) => {
  const [show, setShow] = useState(false);
  const [pick, setPick] = useState(5);

  return (
    <View style={styles.container}>
      <Header
        title
        back
        onBackPress={() => props.navigation.goBack()}
        textTittle={'BÁO CÁO ĐƠN TỪ'}
        rightContent
        setting
        onSettingPress={() => setShow(true)}
      />

      <View style={styles.contentContainer}>
        <TopTab navigation={props.navigation} fillter={selectTime[pick - 1]?.key} />
      </View>
      <ModalRequest
        pickid={() => {}}
        isShow={show}
        setShow={() => setShow(false)}
        pick={pick}
        setPick={setPick}
        key={'ModalRequest'}
      />
    </View>
  );
};
export default RequestManagement;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
  },
  contentContainer: {
    backgroundColor: colors.colorWhite,
    marginTop: 10,
    flex: 1,
  },
  btnchonngay: {
    height: sizes._40sdp,
    width: '40%',
    backgroundColor: colors.colorOrange1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: sizes._10sdp,
  },

  txt: {
    fontSize: sizes.width * 0.04,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  textTab: {
    color: 'black',
    fontSize: sizes.width * 0.04,
    fontFamily: fonts.textRegular,
  },
  btnTab: {
    width: '50%',
    height: sizes._50sdp,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
  },
  btn: {
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colors.colorTxtIput,
    marginHorizontal: 8,
    marginTop: 20,
  },
});
