import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type AuthState = {
  isLogin: boolean;
  userInfor: any;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    userInfor: null,
  } as AuthState,
  reducers: {
    setIsLogin: (state: AuthState, actions: PayloadAction<boolean>) => {
      state.isLogin = actions.payload;
    },
    setUserInfor: (state: AuthState, actions: PayloadAction<any>) => {
      state.userInfor = actions.payload;
    },
  },
});

export const { setIsLogin, setUserInfor } = slice.actions;

export const getIsLogin = (state: RootState) => state.auth.isLogin;

export default slice.reducer;
