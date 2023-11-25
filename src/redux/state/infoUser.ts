import {createSlice} from '@reduxjs/toolkit';
const infoUser = createSlice({
  name: 'infoUser',
  initialState: {
    profile: '',
    id: 0,
    role: 0,
  },
  reducers: {
    addProfile: (state, action) => {
      state.profile = action.payload;
    },
    UserID: (state, action) => {
      state.id = action.payload;
    },
    RoleUser: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {addProfile, UserID, RoleUser} = infoUser.actions;
export default infoUser.reducer;
