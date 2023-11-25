import {createSlice} from '@reduxjs/toolkit';
const initialState: any = {
  fcmtoken: '' as any,
};
const fcmtoken = createSlice({
  name: 'fcmtoken',
  initialState,
  reducers: {
    FCM: (state, action) => {
      state.fcmtoken = action.payload;
    },
  },
});

export const {FCM} = fcmtoken.actions;

export default fcmtoken.reducer;
