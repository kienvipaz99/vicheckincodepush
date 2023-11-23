import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabView, TabBar} from 'react-native-tab-view';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import RenderItemBXHCong from '../component/renderItem/RenderItemBXHCong';
import RenderItemDiSom from '../component/renderItem/RenderItemDiSom';
import RenderItemDiMuon from '../component/renderItem/RenderItemDiMuon';
import stylescustom from '../res/stylescustom';
const TopTabBXH = ({data, isSuccess}: {data?: {data?: User[]}; isSuccess: boolean}) => {
  const [routes, setRoutes] = React.useState([
    {key: 'topvinhdanh', title: 'Top vinh danh'},
    {key: 'topdisom', title: 'Top đi sớm'},
    {key: 'topdimuon', title: 'Top đi muộn'},
  ]);
  const [index, setIndex] = React.useState(0);

  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'topvinhdanh':
        return;
      case 'topdisom':
        return <RenderItemDiSom data={data?.data || []} key={'topdisom'} />;
      case 'topdimuon':
        return <RenderItemDiMuon data={data?.data || []} key={'topdimuon'} />;

      default:
        return null;
    }
  };

  const [focused, setfocused] = useState(0);
  return (
    <View style={{flex: 1}}>
      <View style={styles.view}>
        {routes?.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={focused === index ? styles.view2 : styles.view3}
              onPress={() => setfocused(index)}>
              <Text
                style={{
                  color: focused === index ? 'white' : '#b9b9b9',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  fontSize: sizes._screen_width * 0.032,
                  fontFamily: focused === index ? fonts.textBold : fonts.textRegular,
                }}>
                {item?.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {focused === 0 ? (
        <RenderItemBXHCong data={data?.data || []} />
      ) : focused === 1 ? (
        <RenderItemDiSom data={data?.data || []} />
      ) : (
        focused === 2 && <RenderItemDiMuon data={data?.data || []} />
      )}
    </View>
  );
};

export default TopTabBXH;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f4f4f4',
    width: sizes._screen_width * 0.9,
    height: 40,
    borderRadius: 60,
    ...stylescustom.shadowitem,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  view2: {
    height: 40,
    backgroundColor: '#69bc45',
    borderRadius: 60,
    width: sizes._screen_width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 60,
    width: sizes._screen_width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
