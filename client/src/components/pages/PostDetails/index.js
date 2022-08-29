import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    CircularProgress,
    Divider,
    Box,
    Grid,
} from "@mui/material";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./styles";
import { getPost, getPostsBySearch } from "../../../feature/postSlice";

function PostDetails() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { id } = useParams();
    const {
        post,
        isLoading,
        data: posts,
    } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({
                    tags: post.tags.join(","),
                })
            );
        }
    }, [dispatch, post]);

    if (!post && !isLoading) {
        navigation("/");
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    if (isLoading)
        return (
            <Paper elevation={6} sx={classes.loadingPaper}>
                <CircularProgress size="9em" />
            </Paper>
        );

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <Box sx={classes.card}>
                <Box sx={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by: {post.name}
                    </Typography>
                    <Typography variant="body1">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <Typography variant="body1">
                        <strong>Realtime Chat - coming soon!</strong>
                    </Typography>
                    <Divider sx={{ margin: "20px 0" }} />
                    <Typography variant="body1">
                        <strong>Comments - coming soon!</strong>
                    </Typography>
                    <Divider sx={{ margin: "20px 0" }} />
                </Box>
                <Box sx={classes.imageSection}>
                    <img
                        style={classes.media}
                        src={
                            post.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post.title}
                    />
                </Box>
            </Box>

            <Box sx={classes.section}>
                <Typography variant="h5" gutterBottom>
                    You might like
                </Typography>
                <Divider sx={{ margin: "20px 0" }} />
                <Box sx={classes.recommendedPosts}>
                    {recommendedPosts.length &&
                        recommendedPosts.map((item) => (
                            <Grid
                                container
                                spacing={2}
                                as={Paper}
                                onClick={() => navigation(`/posts/${item._id}`)}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        {item.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        Posted by:{item.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        {moment(item.createdAt).fromNow()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                        src={item.selectedFile}
                                        alt=""
                                    />
                                </Grid>
                            </Grid>
                        ))}
                </Box>
            </Box>
        </Paper>
    );
}

export default PostDetails;
