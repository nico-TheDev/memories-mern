import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

import { getAllPosts } from "../../redux/postSlice";
import classes from "./styles";
import Post from "./Post/Post";

function Posts() {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

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
                    <Post post={post} />
                </Grid>
            ))}
        </Grid>
    );
}

export default Posts;
