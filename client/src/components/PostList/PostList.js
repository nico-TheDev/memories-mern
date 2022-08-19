import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

import { getAllPosts } from "../../feature/postSlice";
import classes from "./styles";
import Post from "./Post/Post";

function PostList({ setCurrentId, currentId }) {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, currentId]);

    console.log(posts.length);

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
