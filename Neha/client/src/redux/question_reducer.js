import { createSlice } from "@reduxjs/toolkit";
import questions from "../database/data";

const initialState = {
  queue: questions,
  trace: 0,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.trace < state.queue.length - 1) state.trace++;
    },
    prevQuestion: (state) => {
      if (state.trace > 0) state.trace--;
    },
    resetQuestion: (state) => {
      state.trace = 0;
    },
  },
});

export const {
  nextQuestion,
  prevQuestion,
  resetQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;