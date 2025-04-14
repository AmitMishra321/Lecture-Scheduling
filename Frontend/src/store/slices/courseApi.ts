import { apiSlice } from './apiSlice';

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses',
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useCreateCourseMutation, useUpdateCourseMutation, useDeleteCourseMutation } = coursesApi;
