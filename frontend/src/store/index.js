import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { conversationApi } from './apis/conversationApi';
import { messagesApi } from './apis/messagesApi';

export const store = configureStore({
  reducer: {
    [conversationApi.reducerPath]: conversationApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(conversationApi.middleware)
      .concat(messagesApi.middleware),
});

setupListeners(store.dispatch);

export { useGetMessagesQuery, useSendMessageMutation } from './apis/messagesApi';
export { useGetConversationQuery, useCreateConversationMutation } from './apis/conversationApi';
