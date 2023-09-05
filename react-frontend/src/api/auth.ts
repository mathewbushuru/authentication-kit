import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "admin/all-users",
    }),
    getRoot: builder.query({
      query: () => `/`,
    }),
    getUserById: builder.query({
      query: (id) => `/admin/user/${id}`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetRootQuery, useGetUserByIdQuery } =
  authApi;
