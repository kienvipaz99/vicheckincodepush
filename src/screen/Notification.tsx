import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import sizes from '../res/sizes';
import images from '../res/images';
import colors from '../res/color';
import stylescustom from '../res/stylescustom';
import fonts from '../res/fonts';
import {useGetNotificationQuery} from '../redux/api/auth.api';
import {dateTime} from '../data/checkday';
import Loading from '../component/Loading';
import HTML from 'react-native-render-html';
import {NavigationProp} from '@react-navigation/native';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function Notification(props: Props) {
  const [per_page, setPer_Page] = useState(10);
  const {data, isLoading, refetch, isFetching} = useGetNotificationQuery({
    per_page: per_page,
  });
  const handleEndReached = () => {
    setPer_Page(per_page + 10);
    refetch();
  };
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const role = useAppSelect(data => data?.infoUser?.role);

  const Click = (link: string) => {
    if (link.includes('leave')) {
      if (role === 1 || role === 2) {
        props.navigation.navigate('SingleWordsss');
      } else {
        props.navigation.navigate('RequestManagement');
      }
    } else if (link.includes('attendances')) {
    } else {
      console.log('Đây không phải là trang leave hoặc attendances.');
    }
  };
  const renderItem = ({item}: {item: Notifications}) => {
    return (
      <>
        <Pressable style={styles.view1} onPress={() => Click(item?.data?.url)}>
          <Image
            source={images.logo}
            style={styles.view2}
            resizeMethod="resize"
            resizeMode="center"
          />
          <View style={styles.view3}>
            <HTML source={{html: item?.data?.message.toUpperCase()}} contentWidth={sizes.width} />
            <Text style={styles.txt3}>{dateTime(item?.updated_at)}</Text>
          </View>
        </Pressable>
        <View style={styles.view} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'Thông báo' + ' (' + (data?.total ? data?.total : 0) + ')'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
      />

      <View style={stylescustom.contentContainer}>
        <FlatList
          data={data?.data}
          renderItem={renderItem}
          removeClippedSubviews
          keyExtractor={item => item.id.toString()}
          onRefresh={refetch}
          scrollEventThrottle={16}
          refreshing={isFetching}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.7}
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    borderTopRightRadius: sizes._20sdp,
    borderTopLeftRadius: sizes._20sdp,
    height: sizes._screen_height,
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backTextWhite: {
    color: '#FFF',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: sizes._screen_width,
    height: 100,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  txt: {
    height: 50,
    width: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    width: sizes._screen_width,
    height: 0.5,
    backgroundColor: colors.colorblack,
  },
  view1: {
    width: sizes._screen_width,
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  view2: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginLeft: 15,
    backgroundColor: 'white',
    ...stylescustom.shadowitem,
  },
  view3: {width: '70%', marginLeft: 30},
  txt1: {
    fontSize: sizes._font_size_big,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
  txt3: {
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.textRegular,
  },
});
