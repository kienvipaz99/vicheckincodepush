import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_LOCAL} from '../../URI_FACE';
import RNFetchBlob from 'rn-fetch-blob';
import stylescustom from '../../res/stylescustom';
import {ActivityIndicator} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import {Alert} from 'react-native';
export default function DowLoadfileMeeting({item, index}: {item: any; index: number}) {
  const [succes, setsucces] = useState(false);
  const [progress, setProgress] = React.useState('');
  let dirs = RNFetchBlob.fs.dirs;
  const filePath = `${dirs.DocumentDir}`;
  const DowLoad = async ({id, name}: {id: string; name: string}) => {
    const url = `${API_LOCAL}/download-file/${id}`;
    var filename = name;

    await RNFetchBlob.config({
      fileCache: false,
      path: `${filePath}/${filename}`,
      IOSBackgroundTask: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        title: filename,
        notification: true,
        path: `${filePath}/${filename}`,
      },
    })
      .fetch('GET', url)
      .progress({interval: 0.01}, (received, total) => {
        setProgress(Math.floor((received / total) * 100) + '%');
      })
      .then(res => {
        setsucces(true);
      })
      .catch(error => {
        Alert.alert('Tải xuống thất bại');
      });
  };
  useEffect(() => {
    const check = async () => {
      const fileExists = await RNFetchBlob.fs.exists(`${filePath}/${item?.file_name}`);
      setsucces(fileExists);
    };
    check();
  }, []);
  return (
    <View key={index + 'file1'} style={[stylescustom.row2]}>
      <View style={[styles.view, {width: sizes.width * 0.76}]}>
        <MaterialCommunityIcons
          name={succes ? 'file-check' : 'file-download'}
          color={colors.colorDargrey}
          size={40}
          onPress={() => {
            succes ? null : DowLoad({id: item?.file_id, name: item?.file_name});
          }}
        />
        <Text style={styles.txt}>{item?.file_name}</Text>
      </View>
      <Text style={styles.txt}>{progress}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    ...stylescustom.row1,
  },
  txt: {color: colors.colorText, fontFamily: fonts.textRegular, fontSize: sizes.width * 0.04},
});
