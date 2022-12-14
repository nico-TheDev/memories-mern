import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Paper, Typography } from "@mui/material";

import classes from "./styles";
import { createPost, updatePost } from "../../feature/postSlice";

function Form({ currentId, setCurrentId }) {
    const post = useSelector((state) =>
        currentId
            ? state.posts.data.find((post) => post._id === currentId)
            : null
    );
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if (currentId) {
            setPostData(post);
        }
    }, [currentId, post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(
                updatePost(currentId, { creator: user.name, ...postData })
            );
        } else {
            dispatch(createPost({ creator: user.name, ...postData }));
        }
        setCurrentId(null);
        handleClear();
    };

    const handleClear = () => {
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: null,
        });
        setCurrentId(null);
    };

    return (
        <Paper sx={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                sx={classes.form}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? "Editing a memoir" : "Creating a memoir"}
                </Typography>
                <TextField
                    sx={classes.fileInput}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    sx={classes.fileInput}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <TextField
                    sx={classes.fileInput}
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({ ...postData, tags: e.target.value })
                    }
                />
                <div sx={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    sx={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleClear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;
