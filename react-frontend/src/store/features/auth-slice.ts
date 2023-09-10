import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type User } from "@/api/types";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

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
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
