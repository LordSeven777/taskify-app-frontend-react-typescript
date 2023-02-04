import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { UserAttributes } from '@customTypes/user';

interface AuthSliceAttributes {
  isAuthenticated: boolean;
  hasFetched: boolean;
  authUser: UserAttributes | null;
  csrfToken: string | null;
}

const initialState: AuthSliceAttributes = {
  isAuthenticated: false,
  hasFetched: false,
  authUser: null,
  csrfToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload }: PayloadAction<Partial<AuthSliceAttributes>>) {
      if (payload.isAuthenticated)
        state.isAuthenticated = payload.isAuthenticated;
      if (payload.hasFetched) state.hasFetched = payload.hasFetched;
      if (payload.authUser) state.authUser = payload.authUser;
      if (payload.csrfToken) state.csrfToken = payload.csrfToken;
    },
    setAuthUser(state, { payload }: PayloadAction<UserAttributes>) {
      state.authUser = payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.authUser = null;
    },
  },
});

export const { setAuth, setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
