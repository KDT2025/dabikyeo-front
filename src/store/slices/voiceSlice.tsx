import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  voice: null,
};

const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoice: (state, action: PayloadAction<any>) => {
      state.voice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state, actions) => {
      return initialState;
    });
  },
});

export const { setVoice } = voiceSlice.actions;

export { voiceSlice };
