import React, { useState } from "react";
import FileBase from "react-file-base64";

import { TextField, Button, Paper, Typography } from "@mui/material";

import classes from "./styles";

function Form() {
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    const handleSubmit = (e) => {};

    return (
        <Paper sx={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                sx={classes.form}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">Creating a memory</Typography>
                <TextField
                    sx={classes.fileInput}
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                />
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
            </form>
        </Paper>
    );
}

export default Form;
