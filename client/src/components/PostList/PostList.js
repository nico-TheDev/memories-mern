import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";

import Post from "./Post/Post";

function PostList({ setCurrentId, currentId }) {
    const { data: posts, isLoading } = useSelector((state) => state.posts);

    if (isLoading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <CircularProgress size={80} />
            </Box>
        );
    }

    return !posts.length ? (
        <Typography variant="h4">No Posts</Typography>
    ) : (
        <Grid
            container
            sx={{
                display: "flex",
                alignItems: "stretch",
            }}
            spacing={3}
        >
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default PostList;
