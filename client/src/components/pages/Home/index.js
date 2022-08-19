import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@mui/material";

import { getAllPosts } from "../../../feature/postSlice";
import PostList from "../../PostList/PostList";
import Form from "../../Form/Form";

function HomePage() {
    const [currentId, setCurrentId] = useState(null);
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
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default HomePage;
