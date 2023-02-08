// Types
import type { UserCreationAttributes } from '@customTypes/user';
import type { AuthResult, LoginCredentials } from '@customTypes/auth';

// Base api
import api from './api';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<AuthResult, UserCreationAttributes>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    login: build.mutation<AuthResult, LoginCredentials>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    tokenAuthentication: build.mutation<AuthResult, void>({
      query: () => ({
        url: 'token-auth',
        method: 'POST',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useTokenAuthenticationMutation,
  useLogoutMutation,
} = authApi;
