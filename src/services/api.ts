import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { RootState } from '@/store';

// Configs
import { API_ENDPOINT_URL } from '@configs/api';

// Empty api slice for the multiple endpoints to extend
const api = createApi({
  reducerPath: 'taskifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT_URL,
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
      // Including CSRF token in every request's header
      const { csrfToken } = (getState() as RootState).auth;
      const crsfTokenKey = 'X-CSRF-TOKEN';
      if (!headers.get(crsfTokenKey) && csrfToken) {
        headers.set(crsfTokenKey, csrfToken);
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Labels', 'Tasks'],
});

export default api;
