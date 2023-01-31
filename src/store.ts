import { configureStore } from '@reduxjs/toolkit';

// Reducers
import api from '@services/api';
import feedbacksReducer from './slices/feedbacks';

const store = configureStore({
  reducer: {
    feedbacks: feedbacksReducer,
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
