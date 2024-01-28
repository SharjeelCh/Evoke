import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import DetailReducer from './DetailReducer';
import wishlistreducer from './wishlistreducer';

export const store = configureStore({
  reducer: {
    cart: reducers,
    detail:DetailReducer,
    wish:wishlistreducer,
  },
});
