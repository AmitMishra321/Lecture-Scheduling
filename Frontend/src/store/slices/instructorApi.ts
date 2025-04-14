// import { apiSlice } from "./apiSlice";


// export interface Instructor {
//   id: string;
//   name: string;
//   email: string;
//   role: "admin";
// }

// export const instructorApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllInstructors: builder.query<Instructor[], void>({
//       query: () => "/instructors",
//     }),

//     createInstructor: builder.mutation<Instructor, Partial<Instructor>>({
//       query: (body) => ({
//         url: "/instructors",
//         method: "POST",
//         body,
//       }),
//     }),

//     updateInstructor: builder.mutation<
//       Instructor,
//       { id: string; data: Partial<Instructor> }>({
//       query: ({ id, data }) => ({
//         url: `/instructors/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//     }),

//     deleteInstructor: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/instructors/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllInstructorsQuery,
//   useCreateInstructorMutation,
//   useUpdateInstructorMutation,
//   useDeleteInstructorMutation,
// } = instructorApi;



import { apiSlice } from "./apiSlice";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  role: "instructor";
}

export const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructors: builder.query<Instructor[], void>({
      query: () => "/instructors",
    }),

    createInstructor: builder.mutation<Instructor, Partial<Instructor>>({
      query: (body) => ({
        url: "/instructors",
        method: "POST",
        body,
      }),
    }),

    updateInstructor: builder.mutation<
      Instructor,
      { id: string; data: Partial<Instructor> }>({
      query: ({ id, data }) => ({
        url: `/instructors/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteInstructor: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/instructors/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllInstructorsQuery,
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
} = instructorApi;

