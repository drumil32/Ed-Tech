import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  enrolled: boolean;
  telNumber: number | null;
  name: string;
  progress: number;
  image: number | null;
}

const initialState: UserState = {
  enrolled: false,
  telNumber: null,
  name: "",
  progress: 0,
  image: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEnrolled(state, action: PayloadAction<boolean>) {
      state.enrolled = action.payload;
    },
    setUserNumber(state, action: PayloadAction<number | null>) {
      state.telNumber = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUserProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setUserImage(state, action: PayloadAction<number | null>) {
      state.image = action.payload;
    },
  },
});

export const { setUserEnrolled, setUserName, setUserNumber, setUserProgress, setUserImage } =
  userSlice.actions;
export default userSlice.reducer;
