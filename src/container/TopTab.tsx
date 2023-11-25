import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import sizes from '../res/sizes';
import {TabView, TabBar} from 'react-native-tab-view';
import fonts from '../res/fonts';
import stylescustom from '../res/stylescustom';
import MeetTheCustomer from '../screen/request/MeetTheCustomer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useRequestStatusQuery} from '../redux/api/auth.api';
import {RootState} from '../redux/store';
import Loading from '../component/Loading';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  fillter: string;
}
export default function TopTab(props: Props) {
  const [routes] = React.useState([
    {key: 'choduyet', title: 'Chưa duyệt'},
    {key: 'chapthuan', title: 'Đã duyệt'},
    {key: 'tuchoi', title: 'Từ chối'},
  ]);

  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const {data, isLoading, refetch} = useRequestStatusQuery({
    id: id,
    params: `within=${props?.fillter}`,
  });
  const choduyet = data?.data.filter((item: LeaveReQuest) => item?.status?.class === 'warning');
  const daduyet = data?.data.filter((item: LeaveReQuest) => item?.status?.class === 'success');
  const tuchoi = data?.data.filter((item: LeaveReQuest) => item?.status?.class === 'danger');

  const [index, setIndex] = React.useState(0);
  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'choduyet':
        return (
          <MeetTheCustomer
            data={choduyet}
            key={'sd'}
            color={'orange'}
            status="Chưa duyệt"
            navigation={props.navigation}
            refetch={refetch}
          />
        );
      case 'chapthuan':
        return (
          <MeetTheCustomer
            key={'sd'}
            color={'orange'}
            status="Đã duyệt"
            navigation={props.navigation}
            data={daduyet}
            refetch={refetch}
          />
        );
      case 'tuchoi':
        return (
          <MeetTheCustomer
            key={'sd'}
            color={'orange'}
            status="Từ chối"
            navigation={props.navigation}
            data={tuchoi}
            refetch={refetch}
          />
        );
      default:
        return null;
    }
  };
  const renderHeader = (props: any) => (
    <TabBar
      pressColor="transparent"
      {...props}
      scrollEnabled={true}
      style={{
        height: sizes._50sdp,
        backgroundColor: 'white',
        ...stylescustom.shadowitem,
      }}
      indicatorStyle={{backgroundColor: '#1352ae', height: 4, borderRadius: 10}}
      tabStyle={{width: sizes._csreen_width / 3}}
      renderLabel={({route, focused, color}: any) => {
        const length =
          route?.key === 'choduyet'
            ? choduyet?.length
            : route?.key === 'chapthuan'
            ? daduyet?.length
            : route?.key === 'tuchoi'
            ? tuchoi?.length
            : 0;
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={[styles.txtheader, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
              {route.title}
              {` (${length})`}
            </Text>
          </View>
        );
      }}
    />
  );
  return (
    <NavigationContainer independent={true}>
      <TabView
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderHeader}
        onIndexChange={(index: any) => {
          setIndex(index);
        }}
      />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  item1: {flexDirection: 'row', alignItems: 'center'},
  txtheader: {
    fontSize: sizes.width * 0.035,
    fontFamily: fonts.textBold,
    paddingRight: 5,
    textAlign: 'center',
  },
});
