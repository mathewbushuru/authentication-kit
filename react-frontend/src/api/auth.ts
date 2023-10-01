import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type RootState } from "@/store/store";
import {
  type LoginRequestType,
  type SignupRequestType,
  type User as UserResponseType,
} from "@/api/types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
    prepareHeaders: (headers, { getState }) => {
      // if we have a token in the store, use it for all authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponseType[], void>({
      query: () => "/admin/all-users",
      providesTags: ["Users"],
    }),
    getRoot: builder.query<any, void>({
      query: () => `/`,
    }),
    getUserById: builder.query<UserResponseType, number>({
      query: (id) => `/admin/user/${id}`,
      providesTags: ["User"], // Use this tag after creating getCurrentUser query
    }),
    login: builder.mutation<UserResponseType, LoginRequestType>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<UserResponseType, SignupRequestType>({
      query: (signupData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    protected: builder.mutation({
      query: () => "/protected",
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetRootQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useSignupMutation,
  useProtectedMutation,
} = authApi;

export default authApi;
