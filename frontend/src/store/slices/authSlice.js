import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  key: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload.key;
    },
    logout: () => initialState,
  },
});

export const { setKey, logout } = authSlice.actions;
export default authSlice.reducer;
