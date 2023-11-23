import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  key: '',
};
const keytoken = createSlice({
  name: 'keytoken',
  initialState,
  reducers: {
    addKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

export const {addKey} = keytoken.actions;

export default keytoken.reducer;
