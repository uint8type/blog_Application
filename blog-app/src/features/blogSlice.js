// blogSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const blogSlice = createSlice({
  name: "blog",
  initialState: { posts: [], loading: false },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    // Implement update and delete reducers
  },
});

export const { setPosts, addPost } = blogSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
  const response = await axios.get("/api/blogs");
  dispatch(setPosts(response.data));
};

export default blogSlice.reducer;
