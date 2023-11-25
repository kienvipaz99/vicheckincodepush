import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: boolean;
}
const initialState: AuthState = {
  token: false,
};

const TokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
  },
});

export const {setToken} = TokenSlice.actions;
export default TokenSlice.reducer;
