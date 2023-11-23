import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import WaitForApprival from '../screen/request/WaitForApprival';
import sizes from '../res/sizes';
import {TabView, TabBar} from 'react-native-tab-view';
import colors from '../res/color';
// import {chapthuan, tuchoi} from '../data/feckData/dontu';
import fonts from '../res/fonts';
import stylescustom from '../res/stylescustom';
import {
  useGetYeucauQuery,
  useRejectRequestQuery,
  useRequestStatusQuery,
} from '../redux/api/auth.api';
import Loading from '../component/Loading';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  fillter: string;
  pickid?: number;
}
export default function TopTabYeuCau(props: Props) {
  const [routes] = React.useState([
    {key: 'yeucau1', title: 'Yêu cầu'},
    {key: 'chapthuan1', title: 'Chấp thuận'},
    {key: 'tuchoi1', title: 'Từ chối'},
  ]);
  const [index, setIndex] = React.useState(0);
  const {data, isLoading, refetch} = useGetYeucauQuery(
    {
      per_page: 100,
    },
    {
      refetchOnFocus: true,
      pollingInterval: 10000,
    },
  );
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      refetch();
      refetchRequset();
    });
    return unsubscribe;
  }, [props.navigation]);
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const {
    data: dataRequset,
    isLoading: LoadingRequest,
    refetch: refetchRequset,
  } = useRequestStatusQuery({
    id: props.pickid ? props.pickid : id,
    params: `within=${props?.fillter}`,
  });
  const daduyet = dataRequset?.data.filter(
    (item: LeaveReQuest) => item?.status?.class === 'success',
  );
  const tuchoi = dataRequset?.data.filter((item: LeaveReQuest) => item?.status?.class === 'danger');

  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'yeucau1':
        return (
          <WaitForApprival
            data={data?.data}
            color={'orange'}
            status="Yêu cầu"
            navigation={props.navigation}
          />
        );

      case 'chapthuan1':
        return (
          <WaitForApprival
            data={daduyet}
            color={colors.colorBlue}
            status="Chấp thuận"
            navigation={props.navigation}
          />
        );
      case 'tuchoi1':
        return (
          <WaitForApprival
            data={tuchoi}
            color={'red'}
            status="Từ chối"
            navigation={props.navigation}
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
                {data?.total && `(${data?.total})`}
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
      {(LoadingRequest || isLoading) && <Loading />}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
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
