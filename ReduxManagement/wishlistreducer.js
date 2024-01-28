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
    removeWish: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { fav,removeWish } = wishlist.actions;

export default wishlist.reducer;
