import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    ButtonBase,
} from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./styles";
import { deletePost, likePost } from "../../../feature/postSlice";

function Post({ post, setCurrentId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [likes, setLikes] = useState(post?.likes);
    const isOwner = user?._id === post?.creator;
    const hasLikedPost = post.likes.find((like) => like === user?._id);

    const handleEdit = () => {
        setCurrentId(post._id);
    };

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== user._id));
        } else {
            setLikes([...post.likes, user._id]);
        }
    };

    const handleOpenPost = () => navigate(`/posts/${post._id}`);

    const Likes = () => {
        const likeCount = likes.length;

        if (likeCount > 0) {
            return hasLikedPost ? (
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
        <Card sx={classes.card} elevation={6} raised>
            <ButtonBase sx={classes.cardAction} onClick={handleOpenPost}>
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

                <Box sx={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </Box>
                <Typography sx={classes.title} variant="h5" gutterBottom noWrap>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        paragraph
                    >
                        {post.message.length > 20
                            ? `${post.message
                                  .split(" ")
                                  .splice(0, 20)
                                  .join(" ")}...`
                            : post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <CardActions sx={classes.cardActions}>
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
