import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import classes from "./styles";

const App = () => {
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
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;
