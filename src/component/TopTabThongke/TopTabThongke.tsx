import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import sizes from '../../res/sizes';
import {TabView, TabBar} from 'react-native-tab-view';
import fonts from '../../res/fonts';
import RenderDanhSach from './RenderDanhSach';
import RendeDanhSachCheckin from './RendeDanhSachCheckin';
import stylescustom from '../../res/stylescustom';
import {
  useGetAttendanceSumaryDailyQuery,
  useGetdashBoardonWorkingQuery,
} from '../../redux/api/auth.api';
import {checknumberdayval2} from '../../data/checkday';
interface Props {
  number: number;
}
export default function TopTabThongke(props: Props) {
  const [datadisom, setDataDiSom] = React.useState<notAttended[]>();
  const [datadimuon, setDaTaDiMuon] = React.useState<notAttended[]>();
  const [chuacheckin, SetChuaCheckIn] = React.useState<notAttended[]>();
  const [nghi, setNghi] = React.useState<notAttended[]>();
  const [vesom, setVeSom] = React.useState<notAttended[]>();
  const {data} = useGetAttendanceSumaryDailyQuery({
    day: checknumberdayval2(),
  });
  const {data: dataDasBoad} = useGetdashBoardonWorkingQuery('');

  useEffect(() => {
    if (data) {
      let aaa = data?.data.filter((item: getAttendanceSumary) => {
        return item?.behavior === 'late';
      });
      let bbb = data?.data.filter((item: getAttendanceSumary) => {
        return item?.behavior === 'early' || item?.behavior === 'regular';
      });

      setDataDiSom(bbb);
      setDaTaDiMuon(aaa);
    }
    if (dataDasBoad) {
      SetChuaCheckIn(dataDasBoad?.notAttended);
      setNghi(dataDasBoad?.leave);
      setVeSom(dataDasBoad?.outEarly);
    }
  }, []);

  const [routes] = React.useState([
    {key: 'chuacheck', title: 'Chưa checkin'},
    {key: 'dunggio', title: 'Đúng giờ'},
    {key: 'dimuon', title: 'Đi muộn'},
    {key: 'vesom', title: 'Về sớm'},
    {key: 'nghilam', title: 'Nghỉ làm'},
    {key: 'gapkhach', title: 'Gặp khách hàng'},
  ]);
  const [index, setIndex] = React.useState(props.number);
  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'chuacheck':
        return <RendeDanhSachCheckin item={chuacheckin} keys={'chuacheck'} />;
      case 'dunggio':
        return <RenderDanhSach item={datadisom} keys={'dunggio'} />;
      case 'dimuon':
        return <RenderDanhSach item={datadimuon} keys={'dimuon'} />;
      case 'vesom':
        return <RendeDanhSachCheckin item={vesom} keys={'vesom'} />;
      case 'nghilam':
        return <RendeDanhSachCheckin item={nghi} keys={'nghilam'} />;
      case 'gapkhach':
        return <RenderDanhSach item={[]} keys={'gapkhach'} />;

      default:
        return null;
    }
  };

  const renderHeader = (props: any) => (
    <TabBar
      pressColor="transparent"
      {...props}
      scrollEnabled={true}
      style={styles.view}
      indicatorStyle={styles.indi}
      tabStyle={{width: sizes._csreen_width / 3.2}}
      renderLabel={({route, focused, color}: any) => {
        return (
          <View style={styles.view1}>
            <Text style={[styles.txtheader, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
              {route.title}
            </Text>
            {route.key === 'chuacheck' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {' '}
                {'(' + chuacheckin?.length + ')'}
              </Text>
            )}
            {route.key === 'dunggio' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {' '}
                {'(' + datadisom?.length + ')'}
              </Text>
            )}
            {route.key === 'dimuon' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {'(' + datadimuon?.length + ')'}
              </Text>
            )}
            {route.key === 'vesom' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {'(' + vesom?.length + ')'}
              </Text>
            )}
            {route.key === 'nghilam' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {'(' + nghi?.length + ')'}
              </Text>
            )}
            {route.key === 'gapkhach' && (
              <Text style={[styles.txt, {color: focused ? '#1352ae' : '#9a9a9a'}]}>
                {'(' + [].length + ')'}
              </Text>
            )}
          </View>
        );
      }}
    />
  );

  return (
    <NavigationContainer independent={true}>
      {data && dataDasBoad && (
        <TabView
          swipeEnabled={true}
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderHeader}
          onIndexChange={(index: any) => {
            setIndex(index);
          }}
        />
      )}
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
    fontSize: sizes._screen_width * 0.035,
    fontFamily: fonts.textRegular,
    paddingRight: 5,
  },
  view: {
    height: sizes._50sdp,
    backgroundColor: 'white',
    ...stylescustom.shadowitem,
  },
  indi: {backgroundColor: '#1352ae', height: 4, borderRadius: 10},
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: sizes._csreen_width / 3.2,
  },
  txt: {
    fontFamily: fonts.textRegular,
  },
});
