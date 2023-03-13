// Types
import type {
  PartialTaskAttributes,
  TaskAttributes,
  TaskFormData,
} from '@customTypes/Task';

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
        {
          type: 'Tasks' as const,
          id: 'PARTIAL-LIST',
        },
        ...tasks.map((t) => ({ type: 'Tasks' as const, id: t._id })),
      ],
    }),
    addTask: build.mutation<TaskAttributes, TaskFormData>({
      query: (payload) => ({
        url: 'tasks',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        {
          type: 'Tasks',
          id: 'PARTIAL-LIST',
        },
      ],
    }),
    updateTask: build.mutation<TaskAttributes, TaskFormData & { id: string }>({
      query: (isCompleted) => ({
        url: 'tasks',
        method: 'PUT',
        body: {
          isCompleted,
        },
      }),
      invalidatesTags: (updatedTask) => {
        const partialListTag = { type: 'Tasks' as const, id: 'PARTIAL-LIST' };
        return updatedTask
          ? [partialListTag, { type: 'Tasks', id: updatedTask._id }]
          : [partialListTag];
      },
    }),
    updateTaskCompletion: build.mutation<
      TaskAttributes,
      { id: string; isCompleted: boolean }
    >({
      query: ({ id, isCompleted }) => ({
        url: `tasks/${id}/isCompleted`,
        method: 'PATCH',
        body: {
          isCompleted,
        },
      }),
      invalidatesTags: (updatedTask) => {
        const partialListTag = { type: 'Tasks' as const, id: 'PARTIAL-LIST' };
        return updatedTask
          ? [partialListTag, { type: 'Tasks', id: updatedTask._id }]
          : [partialListTag];
      },
    }),
    deleteTask: build.mutation<TaskAttributes, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (deletedTask) => {
        const partialListTag = { type: 'Tasks' as const, id: 'PARTIAL-LIST' };
        return deletedTask
          ? [partialListTag, { type: 'Tasks', id: deletedTask._id }]
          : [partialListTag];
      },
    }),
  }),
});

export default tasksService;
export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskCompletionMutation,
  useDeleteTaskMutation,
} = tasksService;
