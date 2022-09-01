import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../../../feature/postSlice";

function CommentSection({ post }) {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const user = useSelector((state) => state.auth.user);

    const handleComment = async () => {
        const commentBody = {
            name: user?.name,
            content: comment,
        };

        const updatedComments = await dispatch(
            commentPost(commentBody, post._id)
        );
        setComment("");

        setComments(updatedComments);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        height: "200px",
                        overflowY: "auto",
                        marginRight: "30px",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>

                    {comments?.length !== 0 &&
                        comments?.map((comment, i) => (
                            <Typography key={i}>
                                <strong>{comment?.name}</strong> :{" "}
                                {comment?.content}
                            </Typography>
                        ))}
                </Box>

                {user && (
                    <Box sx={{ width: "70%" }}>
                        <Typography variant="h6" gutterBottom>
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <Box mt={2}>
                            <Button
                                fullWidth
                                disabled={!comment}
                                variant="contained"
                                onClick={handleComment}
                            >
                                Comment
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default CommentSection;
