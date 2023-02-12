// Types
import type { LabelAttributes } from '@customTypes/Label';

// Base API slice
import api from './api';

const labelsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLabels: build.query<LabelAttributes[], string>({
      query: (userId) => `users/${userId}/labels`,
    }),
  }),
});

export default labelsApi;
export const { useGetLabelsQuery, useLazyGetLabelsQuery } = labelsApi;
