import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function BlogDetails() {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.blog.posts.find((p) => p.id === id),
  );

  if (!post) return <div>Loading...</div>;

  return (
    <Box p={3}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="subtitle1">
        {post.author} - {post.date}
      </Typography>
      <img src={post.image} alt={post.title} style={{ width: "100%" }} />
      <Typography variant="body1">{post.content}</Typography>
    </Box>
  );
}

export default BlogDetails;
