import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const messagesApi = createApi({
  reducerPath: "messages",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
      getMessages: builder.query({
        providesTags: ["Messages"],
        query: (uuid) => `/conversations/${uuid}/messages/`,
      }),
      sendMessage: builder.mutation({
        invalidatesTags: ["Messages"],
        query: (message) => ({
          url: `/send_message/`,
          method: "POST",
          body: { 
            "conversation_id": message.uuid,
            "text": message.text,
          },
        }),
        async onQueryStarted({ uuid, text }, { dispatch, queryFulfilled }) {
          // Optimistic update
          const message = {
            id: 10000000,
            text,
            actor: "user",
            created: new Date().toISOString(),
          }
          const patchResult = dispatch(
            messagesApi.util.updateQueryData("getMessages", uuid, (draft) => {
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
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
export { messagesApi };
