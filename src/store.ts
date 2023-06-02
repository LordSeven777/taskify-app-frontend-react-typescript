import { configureStore } from '@reduxjs/toolkit';

// Reducers
import api from '@services/api';
import feedbacksReducer from '@slices/feedbacks';
import authReducer from '@slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedbacks: feedbacksReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
