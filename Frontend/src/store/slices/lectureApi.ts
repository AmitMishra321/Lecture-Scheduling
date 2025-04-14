import { apiSlice } from "./apiSlice";

interface Lecture {
  id: string;
  title: string;
  date: string;
  instructorId: string;
}


export const lectureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLectures: builder.query<Lecture[], void>({
      query: () => "/lectures",
    }),
    // Add this to lectureApi
    createLecture: builder.mutation<any, any>({
      query: (data) => ({
        url: "/lectures/schedule",
        method: "POST",
        body: data,
      }),
    }),

    // GET instructor's own lectures
    getInstructorLectures: builder.query<
      Lecture[],
      {
        instructorId: string;
        courseName?: string;
        date?: string;
        attendance?: string;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params.instructorId)
          searchParams.append("instructorId", params.instructorId);
        if (params.courseName)
          searchParams.append("courseName", params.courseName);
        if (params.date) searchParams.append("date", params.date);
        if (params.attendance)
          searchParams.append("attendance", params.attendance);

        return `/lectures/my-lectures?${searchParams.toString()}`;
      },
    }),

    // Update attendance 
    updateAttendance: builder.mutation<
      void,
      { id: string; attendance: string }
    >({
      query: (data) => ({
        url: "/lectures/update-attendance",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {
  useGetAllLecturesQuery,
  useGetInstructorLecturesQuery,
  useUpdateAttendanceMutation,
  useCreateLectureMutation,
} = lectureApi;

// import { apiSlice } from "./apiSlice";

// interface Lecture {
//   id: string;
//   title: string;
//   date: string;
//   instructorId: string;
// }

// interface UpdateAttendancePayload {
//   id: string;
//   data: {
//     present: boolean;
//   };
// }

// export const lectureApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllLectures: builder.query<Lecture[], void>({
//       query: () => "/lectures/schedule",
//     }),
//     // GET instructor's own lectures
//     getInstructorLectures: builder.query<Lecture[], void>({
//       query: () => "/lectures/my-lectures",
//     }),

//     // PATCH attendance (instructor or admin)
//     updateAttendance: builder.mutation<void, UpdateAttendancePayload>({
//       query: ({ id, data }) => ({
//         url: `/lectures/${id}/attendance`,
//         method: "PATCH",
//         body: data,
//       }),
//     }),
//     useCreateLecture: builder.mutation<Instructor, Partial<Instructor>>({
//       query: (body) => ({
//         url: "/instructors",
//         method: "POST",
//         body,
//       }),
//     }),

//     updateLecture: builder.mutation<
//       Instructor,
//       { id: string; data: Partial<Instructor> }>({
//       query: ({ id, data }) => ({
//         url: `/instructors/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//     }),

//     deleteLecture: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/instructors/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const { useGetAllLecturesQuery,useGetInstructorLecturesQuery, useUpdateAttendanceMutation ,  useCreateLectureMutation,
//   // useUpdateInstructorMutation,
//   useDeleteLectureMutation,} =
//   lectureApi;
