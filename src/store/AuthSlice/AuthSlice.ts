import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalUserStrict } from "../api/api";
import { UserInfoType } from "../../types";
import { RootState } from "../store";

interface InitialStateType {
  userInfo: UserInfoType;
}

const initialState: InitialStateType = {
  userInfo: getLocalUserStrict(),
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
  },
});

export default AuthSlice.reducer;
export const { setUserInfo } = AuthSlice.actions;
export const getUserInfo = (state: RootState) => state.authentication;
