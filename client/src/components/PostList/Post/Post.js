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
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useDispatch, useSelector } from "react-redux";

import classes from "./styles";
import { deletePost, likePost } from "../../../feature/postSlice";

function Post({ post, setCurrentId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleEdit = () => {
        setCurrentId(post._id);
    };

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    };

    const handleLike = () => {
        dispatch(likePost(post._id));
    };
    const likeCount = post.likes.length;

    const isOwner = user?._id === post?.creator;

    const Likes = () => {
        if (likeCount > 0) {
            return post.likes.find((like) => like === user?._id) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" /> &nbsp;{" "}
                    {likeCount > 2
                        ? `You and ${likeCount} others`
                        : `${likeCount} like${likeCount > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp;
                    {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp; Like
            </>
        );
    };

    return (
        <Card sx={classes.card}>
            <CardMedia
                sx={classes.media}
                image={post.selectedFile}
                title={post.title}
            />

            <Box sx={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </Box>

            {/* EDIT BUTTON */}
            {isOwner && (
                <Box sx={classes.overlay2}>
                    <Button
                        sx={{ color: "white" }}
                        size="small"
                        onClick={handleEdit}
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </Box>
            )}

            <Box sx={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags[0].split(",").map((tag) => `#${tag} `)}
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
                <Button
                    size="small"
                    color="primary"
                    onClick={handleLike}
                    disabled={!user}
                >
                    <Likes />
                </Button>
                {isOwner && (
                    <Button size="small" color="primary" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                        &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;
