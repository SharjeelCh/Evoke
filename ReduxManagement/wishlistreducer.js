import { createSlice } from '@reduxjs/toolkit';

export const wishlist = createSlice({
  name: 'wish',
  initialState: {
    items: [],
  },
  reducers: {
    fav: (state, action) => {
      state.items.push(action.payload);
    },
   
  },
});

export const { fav } = wishlist.actions;

export default wishlist.reducer;
