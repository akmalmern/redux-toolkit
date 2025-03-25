import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/counter/postSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
