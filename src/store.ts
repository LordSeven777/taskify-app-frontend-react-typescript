import { configureStore } from '@reduxjs/toolkit';

// Reducers
import api from '@services/api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
