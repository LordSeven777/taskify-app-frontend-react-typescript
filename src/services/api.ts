import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Configs
import { API_ENDPOINT_URL } from '@configs/api';

// Empty api slice for the multiple endpoints to extend
const api = createApi({
  reducerPath: 'taskifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

export default api;
