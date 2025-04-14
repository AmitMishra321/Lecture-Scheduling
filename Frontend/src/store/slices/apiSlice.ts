import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  {RootState} from "@/store/index"
// const API_URI = "http://localhost:8000/api";
const API_URI = import.meta.env.VITE_APP_BASE_URL;


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI + "api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
