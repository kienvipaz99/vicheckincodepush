import {createSlice} from '@reduxjs/toolkit';
const checkVitri = createSlice({
  name: 'checkvitri',
  initialState: {
    checkvitri: '',
  },
  reducers: {
    checkvitri: (state, action) => {
      state.checkvitri = action.payload;
    },
  },
});
export const {checkvitri} = checkVitri.actions;
export default checkVitri.reducer;
