import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/types";

interface UserState {
  user: UserDetails;
}

const initialState: UserState = {
  user: {
    enrolled: false,
    phoneNumber: null,
    name: "",
    progress: 0,
    avatar: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
