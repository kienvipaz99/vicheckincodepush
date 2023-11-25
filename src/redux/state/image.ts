import {createSlice} from '@reduxjs/toolkit';
const checkImage = createSlice({
  name: 'checkimage',
  initialState: {
    image: [],
  },
  reducers: {
    image: (state, action) => {
      state.image = action.payload;
    },
    deleteImage: (state, action) => {
      const itemId = action.payload;
      state.image = state.image.filter((item: any) => item !== itemId);
    },
    addImage: (state: any, action) => {
      state.image.push(action.payload);
    },
  },
});
export const {image, deleteImage, addImage} = checkImage.actions;
export default checkImage.reducer;
