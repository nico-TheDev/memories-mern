import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grow, Grid, Paper, Typography } from "@mui/material";

import { getAllPosts } from "../../../feature/postSlice";
import PostList from "../../PostList/PostList";
import Form from "../../Form/Form";

function HomePage() {
    const [currentId, setCurrentId] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container>
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12} sm={7}>
                        <PostList
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {user ? (
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        ) : (
                            <Paper sx={{ padding: 2, fontSize: "20px" }}>
                                <Typography variant="h6" textAlign="center">
                                    Sign in or Create an account to add a memoir
                                </Typography>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default HomePage;
