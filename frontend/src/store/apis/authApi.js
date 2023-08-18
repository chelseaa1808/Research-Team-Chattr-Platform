import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setKey, logout } from "../../store"

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.key
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        invalidatesTags: ["User"],
        query: (credentials) => ({
          url: `/login/`,
          method: "POST",
          body: credentials,
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const {data} = await queryFulfilled;
            dispatch(setKey({ key: data.key }));
          } catch (error) {
            // We'll pretend this never happens for now
          }
        }
      }),
      getUser: builder.query({
        providesTags: ["User"],
        query: () => ({
          url: `/user/`,
          method: "GET",
        }),
      }),
      logout: builder.mutation({
        invalidatesTags: ["User"],
        query: () => ({
          url: `/logout/`,
          method: "POST",
        }),
        onQueryStarted: async (_, { dispatch }) => {
          dispatch(logout());
          // dispatch(authApi.util.updateQueryData("getUser", undefined, () =>  undefined ));
        }
      }),
    }
  }
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi;
export { authApi };
