import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./features/blogSlice";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Link to={`/blog/${post.id}`}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.excerpt}</Typography>
              <Typography variant="caption">{post.date}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
