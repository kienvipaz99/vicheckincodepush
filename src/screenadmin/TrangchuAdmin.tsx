import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import sizes from '../res/sizes';
import colors from '../res/color';
import RenderChamCong from './component/RenderChamCong';
import itemquanly from '../data/itemquanly';
import RenderitemQuanLy from './component/RenderItemQuanLy';
import HeaderHome from '../component/HeaderHome';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import fonts from '../res/fonts';
import itemadmin from '../data/itemadmin';
import {datacheckin} from '../data/datacheckin';
import {RootState} from '../redux/store';
import {useGetNotificationQuery} from '../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
import TopTab from '../container/TopTabTrangChu';

interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function TrangchuAdmin(props: Props) {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const info = useAppSelect(data => data?.infoUser);
  const {data} = useGetNotificationQuery({
    per_page: 10,
  });
  const ListFooter = () => (
    <>
      <Text style={styles.texttitle}>Thống kê checkin hôm nay</Text>
      <View style={styles.view1}>
        {datacheckin.map((item, index) => {
          return <RenderChamCong item={item} key={index} navigation={props.navigation} />;
        })}
      </View>
      <Text style={styles.texttitle}>Quản lý</Text>
      <View style={styles.view2}>
        {itemquanly.map((item, index) => {
          return (
            <RenderitemQuanLy
              key={index}
              name={item.name}
              img={item.img}
              navigate={item.navigation}
              navigation={props.navigation}
            />
          );
        })}
      </View>
      <TopTab navigation={props.navigation} item={itemadmin} />
    </>
  );
  return (
    <View style={styles.container}>
      <HeaderHome
        data={data?.total ? data?.total : 0}
        navigation={props.navigation}
        id={info?.id}
      />
      <View style={styles.item}>
        <FlatList
          data={[]}
          bounces={false}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{flex: 1}}
          ListHeaderComponent={() => <ListFooter />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  texttitle: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big_big,
    marginTop: sizes._25sdp,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  quanly: {
    backgroundColor: 'white',
    padding: 20,
    width: sizes._csreen_width * 0.9,
    borderRadius: 10,
  },
  contentContainer: {
    backgroundColor: colors.colorWhite,
    width: '100%',
    borderTopRightRadius: sizes._20sdp,
    borderTopLeftRadius: sizes._20sdp,
    height: sizes._screen_height,
    flex: 1,
  },
  text: {
    color: colors.colorblack,
    fontSize: sizes._font_size_big_big,
    fontWeight: '500',
  },
  item: {
    borderTopLeftRadius: sizes._30sdp,
    borderTopRightRadius: sizes._30sdp,
    marginTop: 120,
    backgroundColor: colors.colorWhite,
    width: sizes.width,
    alignItems: 'center',
  },
  view1: {
    flexDirection: 'row',
    marginTop: sizes._10sdp,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: sizes._screen_width * 0.9,
    alignSelf: 'center',
  },
  view2: {
    flexDirection: 'row',
    marginTop: sizes._10sdp,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: sizes._screen_width * 0.9,
    flex: 1,
    alignSelf: 'center',
  },
  view: {
    flex: 1,
    height: sizes._screen_height,
  },
  item6: {
    width: sizes._screen_width,
    alignItems: 'center',
  },
});
