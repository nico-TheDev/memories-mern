import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import memories from "./images/memories.png";
import PostList from "./components/PostList/PostList";
import Form from "./components/Form/Form";

import classes from "./styles";

const App = () => {
    const [currentId, setCurrentId] = useState(null);

    return (
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit" sx={classes.appBar}>
                <Typography variant="h2" align="center" sx={classes.heading}>
                    Memories
                </Typography>
                <img
                    src={memories}
                    alt="memories"
                    height="60"
                    sx={classes.image}
                />
            </AppBar>
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
        </Container>
    );
};

export default App;
