import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSliceAttributes {
  hasFetched: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthSliceAttributes = {
  hasFetched: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setHasFetched(state, action: PayloadAction<boolean>) {
      state.hasFetched = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setHasFetched, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
