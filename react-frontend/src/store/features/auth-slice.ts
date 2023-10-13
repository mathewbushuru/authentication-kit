import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type User } from "@/api/types";
import { localStorageHelpers } from "@/lib/utils";

const userToken = localStorageHelpers.getToken();

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorageHelpers.setToken(action.payload.token);
    },
    clearCredentials: (state) => {
      localStorageHelpers.removeToken();
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
