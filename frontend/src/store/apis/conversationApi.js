import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const conversationApi = createApi({
  reducerPath: "conversation",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
      // getConversations: builder.query({
      //   query: () => "/conversations",
      // }),
      getConversation: builder.query({
        query: (conversationId) => `/conversations/${conversationId}/`,
      }),
      createConversation: builder.mutation({
        query: (slug) => ({
          url: `/${slug}/new/`,
          method: "GET",
        }),
      }),
    }
  },

});

export const {
  // useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
} = conversationApi;
export { conversationApi };
