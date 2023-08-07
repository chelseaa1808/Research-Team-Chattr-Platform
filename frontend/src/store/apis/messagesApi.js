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
      }),
    }
  }
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
export { messagesApi };
