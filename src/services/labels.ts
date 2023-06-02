// Types
import type {
  LabelAttributes,
  LabelCreationAttributes,
  LabelUpdateMutationPayload,
} from '@customTypes/Label';

// Base API slice
import api from './api';

const labelsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLabels: build.query<LabelAttributes[], string>({
      query: (userId) => `users/${userId}/labels`,
      providesTags: () => [{ type: 'Labels' }],
    }),
    addLabel: build.mutation<LabelAttributes, LabelCreationAttributes>({
      query: (payload) => ({
        url: 'labels',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Labels'],
    }),
    updateLabel: build.mutation<LabelAttributes, LabelUpdateMutationPayload>({
      query: ({ _id, ...payload }) => ({
        url: `labels/${_id}`,
        method: 'PUT',
        body: { ...payload },
      }),
      invalidatesTags: ['Labels'],
    }),
    deleteLabel: build.mutation<void, string>({
      query: (id) => ({
        url: `labels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Labels'],
    }),
  }),
});

export default labelsApi;
export const {
  useGetLabelsQuery,
  useLazyGetLabelsQuery,
  useAddLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = labelsApi;
