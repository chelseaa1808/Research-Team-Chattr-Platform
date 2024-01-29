import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
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
      // Conversations
      getConversation: builder.query({
        query: (conversationId) => `/conversations/${conversationId}/`,
      }),
      createConversation: builder.mutation({
        query: (conversation) => {
          let url = `/${conversation.slug}/new/`;
          if (conversation.external_id !== undefined) {
            url += `?uid=${conversation.external_id}`;
          }
          return {
            url,
            method: "GET",
          };
        },
      }),
      // Messages
      getMessages: builder.query({
        providesTags: (result, error, uuid) => [{ type: "Messages", id: uuid }],
        query: (uuid) => `/conversations/${uuid}/messages/`,
      }),
      getBots: builder.query({
        query: () => `/bots/`,
      }),
      getConversations: builder.query({
        query: (name) => `/bots/${name}`,
      }),
      sendMessage: builder.mutation({
        invalidatesTags: (result, error, { uuid }) => [{ type: "Messages", id: uuid }],
        query: (message) => ({
          url: `/send_message/`,
          method: "POST",
          body: { 
            "conversation_id": message.uuid,
            "text": message.text,
          },
        }),
        // Temporarily add the latest message to the list of messages
        // until the server list is updated
        async onQueryStarted({ uuid, text }, { dispatch, queryFulfilled }) {
          // Optimistic update
          const message = {
            id: 10000000,
            text,
            actor: "user",
            created: new Date().toISOString(),
          }
          const patchResult = dispatch(
            chatApi.util.updateQueryData("getMessages", uuid, (draft) => {
              draft.push(message);
            })
          )
          try {
            await queryFulfilled;
          } catch {
            // If the request fails, revert the optimistic update
            dispatch(patchResult.undo);
          }
        }
      }),
    }
  }
});

export const {
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetBotsQuery,
  useGetConversationsQuery,
  useLoginMutation,
} = chatApi;
export { chatApi };
