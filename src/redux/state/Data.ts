import {PayloadAction, createSlice} from '@reduxjs/toolkit';
interface PayloadLogin {
  email: string;
  password: string;
}
const initialState = {
  username: {
    email: '',
    password: '',
  },
};

const Data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<PayloadLogin>) => {
      state.username = action.payload;
    },
  },
});

export const {addUser} = Data.actions;

export default Data.reducer;
