import { createSlice } from '@reduxjs/toolkit';

export const details = createSlice({
  name: 'detail',
  initialState: {
    items: [],
  },
  reducers: {
    seedetail: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { seedetail } = details.actions;

export default details.reducer;
