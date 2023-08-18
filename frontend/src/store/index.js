import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chatApi } from './apis/chatApi';
import { authApi } from './apis/authApi';
import authReducer from './slices/authSlice';

const getCsrfToken = () => {
  const name = 'csrftoken';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

const persistConfig = {
  key: "chattr",
  storage
}

const rootReducer = combineReducers({
  auth: authReducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(thunk)
      .concat(chatApi.middleware)
      .concat(authApi.middleware)
      .concat((store) => (next) => (action) => {
        if (action.type.endsWith('/rejected') && action.error.message === 'Request failed with status code 403') {
          const csrfToken = getCsrfToken();
          console.log('csrfToken', csrfToken);
          if (csrfToken) {
            // const state = store.getState();
            const headers = action.meta.request.headers;
            headers['X-CSRFToken'] = csrfToken;
            // headers['Authorization'] = `Token ${state.auth.token}`;
            return next(store.dispatch(action.meta.request));
          }
        }
        return next(action);
      }),
});

setupListeners(store.dispatch);

export { setKey, logout } from './slices/authSlice';
export { useGetMessagesQuery, useSendMessageMutation, useCreateConversationMutation, useGetConversationQuery } from './apis/chatApi';
export { useLoginMutation, useGetUserQuery, useLogoutMutation } from './apis/authApi';
export const persistor = persistStore(store);
