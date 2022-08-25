import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Grow,
    Grid,
    Paper,
    Typography,
    AppBar,
    TextField,
    Chip,
} from "@mui/material";

import { getAllPosts } from "../../../feature/postSlice";
import PostList from "../../PostList/PostList";
import Form from "../../Form/Form";
import Pagination from "../../Pagination";
import classes from "./styles";

function HomePage() {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, currentId]);

    const handleKeyPress = (e) => {
        if (e.key === ",") {
            console.log("CHIP");
        }
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    sx={{
                        flexDirection: {
                            xs: "column-reverse",
                            md: "initial",
                        },
                    }}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <PostList
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            position="static"
                            color="inherit"
                            sx={classes.appBarSearch}
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search for Memoir"
                                fullWidth
                                value={search}
                                onChange={handleSearch}
                                onKeyDown={handleKeyPress}
                            />
                        </AppBar>
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

                        <Paper elevation={6} sx={classes.pagination}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default HomePage;
