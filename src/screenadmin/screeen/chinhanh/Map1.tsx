import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import sizes from '../../../res/sizes';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Header from '../../../component/Header';
import stylescustom from '../../../res/stylescustom';
import images from '../../../res/images';
import fonts from '../../../res/fonts';
import Geolocation from '@react-native-community/geolocation';
import {NavigationProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {TextInput} from 'react-native';
import colors from '../../../res/color';
import {APIMAPS, KEYMAP} from '../../../URI_FACE';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const Map1 = (props: Props) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState<MapTypes[]>();
  const [show, setShow] = useState(false);
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLongitude(info?.coords?.longitude);
      setLatitude(info?.coords?.latitude);
    });
  }, []);
  const check = async () => {
    try {
      const data = await axios.get(
        `${APIMAPS}/AutoComplete?input=${search}&api_key=${KEYMAP}&limit=${10}`,
      );
      setDataSearch(data.data.predictions);
    } catch (error) {
      console.log(error);
    }
  };
  const checklonglat = async (place_id: string) => {
    try {
      const data = await axios.get(`${APIMAPS}/Detail?place_id=${place_id}&api_key=${KEYMAP}`);
      let location = data?.data?.result?.geometry?.location;
      setLongitude(location?.lng);
      setLatitude(location?.lat);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'CHỌN VỊ TRÍ'}
        back
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={[stylescustom.contentContainer]}>
        <View style={styles.view}>
          <View style={stylescustom.row1}>
            <Image source={images.address} style={styles.img} />
            <TextInput
              placeholder="Tìm kiếm địa chỉ"
              onPressIn={() => setShow(true)}
              value={search}
              onChangeText={setSearch}
              style={styles.tip}
              cursorColor={'black'}
              selectionColor={'black'}
              editable={show}
              onSubmitEditing={check}
            />
          </View>
          <Text style={styles.txt} onPress={() => {}}>
            Lưu
          </Text>
        </View>
        {show && (
          <View style={styles.view1}>
            {dataSearch?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={styles.btn}
                  onPress={() => {
                    checklonglat(item?.place_id);
                    setSearch(item?.description);
                    setShow(false);
                  }}>
                  <Ionicons name="location-outline" color={colors.colorblack} size={25} />
                  <Text style={styles.txt1}>{item?.description}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
          }}
          onPoiClick={event => {
            setLatitude(event.nativeEvent.coordinate.latitude);
            setLongitude(event.nativeEvent.coordinate.longitude);
            let aa = event.nativeEvent.name.split(/\s+/);
            setSearch(aa.join(' '));
            check();
          }}
          followsUserLocation={true}>
          <Marker coordinate={{latitude: latitude, longitude: longitude}} />
        </MapView>
      </View>
    </View>
  );
};
export default Map1;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: sizes._screen_width,
    flex: 1,
  },
  map: {
    width: sizes._screen_width,
    height: '100%',
  },
  view: {
    height: sizes._50sdp,
    borderWidth: 1,
    width: sizes._screen_width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 35,
    width: 35,
    tintColor: 'black',
    marginLeft: 10,
  },
  txt: {
    marginRight: 15,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  btn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.width * 0.9,
    justifyContent: 'space-between',
  },
  txt1: {
    color: colors.colorblack,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.035,
    width: sizes.width * 0.75,
  },
  view1: {
    width: sizes.width,
    backgroundColor: colors.colorWhite,
    padding: 10,
  },
  tip: {height: 50, width: sizes.width * 0.7},
});
