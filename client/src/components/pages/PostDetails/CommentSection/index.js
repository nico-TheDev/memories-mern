import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";

function CommentSection({ post }) {
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    console.log(post);
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                </Box>
            </Box>
        </Box>
    );
}

export default CommentSection;
