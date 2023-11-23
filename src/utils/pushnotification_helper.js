import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmToken) {
    try {
      await messaging().registerDeviceForRemoteMessages(); // đăng ký thiết bị
      const remoteMessage = await messaging().getToken();
      fcmToken = remoteMessage;

      await AsyncStorage.setItem('fcmtoken', fcmToken);
    } catch (error) {}
  }
  return fcmToken;
}
