import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

import classes from "./styles";
import Post from "./Post/Post";

function PostList({ setCurrentId, currentId }) {
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid
            sx={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={2}
        >
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default PostList;
