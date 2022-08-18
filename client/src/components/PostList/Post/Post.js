import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
} from "@mui/material";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import classes from "./styles";

function Post({ post, setCurrentId }) {
    const handleEdit = () => {
        console.log("EDIT");
        setCurrentId(post._id);
    };

    return (
        <Card sx={classes.card}>
            <CardMedia
                sx={classes.media}
                image={post.selectedFile}
                title={post.title}
            />

            <Box sx={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </Box>

            {/* EDIT BUTTON */}
            <Box sx={classes.overlay2}>
                <Button
                    sx={{ color: "white" }}
                    size="small"
                    onClick={handleEdit}
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </Box>

            <Box sx={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </Box>
            <Typography sx={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>

            <CardActions sx={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;{post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {}}>
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;
