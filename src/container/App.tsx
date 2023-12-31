import * as React from 'react';
import {StatusBar, Alert} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Container from './Container';
import Notification from '../component/modal/Notification';
import {getFCMToken} from '../utils/pushnotification_helper';

import codePush from 'react-native-code-push';

let persistor = persistStore(store);
const App = () => {
  const [notification, setNotification] = React.useState<any>();
  messaging().requestPermission();

  async function getNotifi() {
    messaging().onMessage(async remoteMessage => {
      setNotification(remoteMessage.notification);
    });
  }
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    Alert.alert('BACKGROUND', JSON.stringify(remoteMessage));
  });
  const handleCloseModal = () => {
    setNotification(null);
  };
  React.useEffect(() => {
    getNotifi();
  }, []);
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={'light-content'}
          showHideTransition={'fade'}
          translucent={true}
        />
        <Notification
          toggleDate={handleCloseModal}
          data={notification}
          isShow={notification == null ? false : true}
        />
        <Container />
      </PersistGate>
    </Provider>
  );
};

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);
