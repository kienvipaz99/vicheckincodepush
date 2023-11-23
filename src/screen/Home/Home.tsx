import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import CheckLocation from '../../component/CheckLocation';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import HeaderHome from '../../component/HeaderHome';
import itemtrangchu from '../../data/itemtrangchu';
import {useGetNotificationQuery} from '../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
import Today from './Today';
import MonthDay from './MonthDay';
import {RootState} from '../../redux/store';
import TopTab from '../../container/TopTabTrangChu';

interface Props {
  navigation: NavigationProp<Record<string, any>>;
}

const Home = (props: Props) => {
  const {data} = useGetNotificationQuery({
    per_page: 1,
  });
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const info = useAppSelect(data => data.infoUser);

  const ListFooter = () => (
    <>
      <HeaderHome
        data={data?.total ? data?.total : 0}
        navigation={props.navigation}
        id={info?.id}
      />
      <View style={styles.view3}>
        <View style={styles.item1}>
          <Today navigation={props.navigation} />
          <MonthDay navigation={props.navigation} id={info.id} />
        </View>
        <View style={styles.item6}>
          <CheckLocation navigation={props.navigation} />
          <TopTab navigation={props.navigation} item={itemtrangchu} />
        </View>
      </View>
    </>
  );

  return (
    <View>
      <FlatList
        data={[]}
        bounces={false}
        renderItem={null}
        ListHeaderComponent={() => <ListFooter />}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{flex: 1}}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  item1: {
    width: '100%',
    top: -sizes._screen_height * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item6: {
    width: '100%',
    alignItems: 'center',
  },
  view3: {
    borderTopLeftRadius: sizes._30sdp,
    borderTopRightRadius: sizes._30sdp,
    marginTop: sizes._screen_height * 0.2,
    backgroundColor: 'white',
  },
});
