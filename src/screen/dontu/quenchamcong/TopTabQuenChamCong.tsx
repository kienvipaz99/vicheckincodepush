import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../component/Header';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';

import stylescustom from '../../../res/stylescustom';
import TopTabYeuCau from '../../../container/TopTabYeuCau';
import fonts from '../../../res/fonts';
import sizes from '../../../res/sizes';
import {TabView, TabBar} from 'react-native-tab-view';
import {useAttendancesRequestQuery} from '../../../redux/api/auth.api';
import RequestChamcong from './RequestChamcong';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const TopTabQuenChamCong = ({navigation}: {navigation: NavigationProp<Record<string, any>>}) => {
  const {data} = useAttendancesRequestQuery('');
  const [routes] = React.useState([
    {key: 'yeucau1', title: 'Yêu cầu'},
    {key: 'chapthuan1', title: 'Chấp thuận'},
    {key: 'tuchoi1', title: 'Từ chối'},
  ]);
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const [index, setIndex] = React.useState(0);
  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'yeucau1':
        return <RequestChamcong data={data?.data} />;

      case 'chapthuan1':
        return <></>;
      case 'tuchoi1':
        return <></>;
      default:
        return null;
    }
  };
  const renderHeader = (props: any) => (
    <TabBar
      pressColor="transparent"
      {...props}
      scrollEnabled={true}
      style={[stylescustom.shadowitem, styles.view1]}
      indicatorStyle={styles.view2}
      tabStyle={{width: sizes._csreen_width / 3}}
      renderLabel={({route, focused, color}: any) => {
        return (
          <View style={styles.view}>
            <Text style={[styles.txtheader, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
              {route.title}
            </Text>
            {route.key === 'yeucau1' && (
              <Text
                style={{
                  fontSize: sizes.width * 0.038,
                  color: focused ? '#1352ae' : '#9a9a9a',
                  fontFamily: fonts.textRegular,
                }}>
                {/* {data?.total && `(${data?.total})`} */}
              </Text>
            )}

            {route.key === 'chapthuan1' && (
              <Text
                style={{
                  color: focused ? '#1352ae' : '#9a9a9a',
                  fontFamily: fonts.textRegular,
                  fontSize: sizes.width * 0.038,
                }}>
                {/* {data?.total && `(${data?.total})`} */}
              </Text>
            )}
            {route.key === 'tuchoi1' && (
              <Text
                style={{
                  color: focused ? '#1352ae' : '#9a9a9a',
                  fontFamily: fonts.textRegular,
                  fontSize: sizes.width * 0.038,
                }}>
                {/* {DataReject?.total && `(${DataReject?.total})`} */}
              </Text>
            )}
          </View>
        );
      }}
    />
  );

  return (
    <View style={styles.conteiner}>
      <Header back onBackPress={() => navigation.goBack()} title textTittle={'Quên chấm công'} />
      <View style={stylescustom.contentContainer}>
        <NavigationContainer independent={true}>
          <TabView
            swipeEnabled={true}
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderHeader}
            onIndexChange={(index: number) => {
              setIndex(index);
            }}
          />
        </NavigationContainer>
      </View>
    </View>
  );
};

export default TopTabQuenChamCong;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  item1: {flexDirection: 'row', alignItems: 'center'},
  item2: {
    height: 20,
    width: 20,
    borderRadius: 30,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  txtheader: {
    fontSize: sizes._font_size_large,
    fontFamily: fonts.textRegular,
    paddingRight: 5,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view1: {
    height: sizes._50sdp,
    elevation: 10,
    backgroundColor: 'white',
  },
  view2: {backgroundColor: '#1352ae', height: 4, borderRadius: 10},
});
