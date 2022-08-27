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
    Button,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";

import { getAllPosts, getPostsBySearch } from "../../../feature/postSlice";
import PostList from "../../PostList/PostList";
import Form from "../../Form/Form";
import Pagination from "../../Pagination";
import classes from "./styles";

function HomePage() {
    const navigate = useNavigate();
    const [currentId, setCurrentId] = useState(null);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, currentId]);

    const searchPosts = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(
                    ","
                )}`
            );
        } else {
            navigate("/");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPosts();
        }
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleAddTags = (tag) => setTags([...tags, tag]);

    const handleDeleteTags = (tag) =>
        setTags(tags.filter((current) => current !== tag));

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
                            <ChipInput
                                style={{ margin: "16px 0" }}
                                value={tags}
                                onAdd={handleAddTags}
                                onDelete={handleDeleteTags}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={searchPosts}
                            >
                                Search
                            </Button>
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
