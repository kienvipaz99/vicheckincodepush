import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer} from 'redux-persist';
import data from '../redux/state/Data';
import CheckImage from './state/image';
import checkVitri from './state/Checkvitri';
import keytoken from './state/keytoken';

import infoUser from './state/infoUser';
import checktoken from './state/checktoken';
import fcmtoken from './state/fcmtoken';
import {authApi} from './api/auth.api';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {useDispatch} from 'react-redux';
const reducers = combineReducers({
  data: data,
  keytoken: keytoken,
  checkimage: CheckImage,
  checkVitri: checkVitri,
  infoUser: infoUser,
  TokenSlice: checktoken,
  fcmtoken: fcmtoken,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'checkVitri',
    'keytoken',
    'checkimage',
    'infoUser',
    'TokenSlice',
    'UserSlice',
    authApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware]);
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch as () => AppDispatch;
export default store;
