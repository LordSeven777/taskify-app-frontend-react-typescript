// Types
import type { PartialTaskAttributes } from '@customTypes/Task';

// Base API slice
import api from './api';

interface GetTasksQueryParams {
  date: string;
  userId: string;
}

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<PartialTaskAttributes[], GetTasksQueryParams>({
      query: ({ date, userId }) => ({
        url: `users/${userId}/tasks`,
        params: {
          date,
          sort: 'startsAt',
        },
      }),
      providesTags: (tasks = []) => [
        ...tasks.map((t) => ({ type: 'Tasks' as const, id: t._id }), {
          type: 'Tasks',
          id: 'PARTIAL-LIST',
        }),
      ],
    }),
  }),
});

export default tasksService;
export const { useGetTasksQuery, useLazyGetTasksQuery } = tasksService;
