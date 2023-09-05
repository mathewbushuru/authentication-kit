import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export interface UserAuthState {
  loading: boolean;
  userInfo: {};
  userJwtToken: string | null;
  error: null;
  success: boolean;
}

const initialState: UserAuthState = {
  loading: false,
  userInfo: {},
  userJwtToken: userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
