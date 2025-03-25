import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = createAsyncThunk("/api/posts", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const createPost = createAsyncThunk("/api/add", async (newPost) => {
  const add = await axios.post(API_URL, newPost);
  return add.data;
});

export const updatePost = createAsyncThunk(
  "/api/update",
  async ({ id, updatePost }) => {
    const edit = await axios.put(`${API_URL}/${id}`, updatePost);
    return edit.data;
  }
);

export const deletPost = createAsyncThunk("/api/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const searchPost = createAsyncThunk();

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get posts
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // add posts
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    // update post
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    });
    // delet post
    builder.addCase(deletPost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export default postSlice.reducer;
