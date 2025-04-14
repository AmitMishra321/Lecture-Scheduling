import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
