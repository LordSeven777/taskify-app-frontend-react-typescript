// Types
import { UserCreationAttributes } from '@customTypes/user';
import type { AuthResult } from '@customTypes/auth';

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
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation } = authApi;
