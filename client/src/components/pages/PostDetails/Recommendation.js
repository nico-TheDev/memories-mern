import React from "react";
import { ButtonBase, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Recommendation({ item }) {
    const navigate = useNavigate();

    return (
        <ButtonBase
            onClick={() => navigate(`/posts/${item._id}`)}
            sx={{
                maxWidth: "300px",
                padding: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <Grid key={item._id} container spacing={2} as={Paper} elevation={6}>
                <Grid item xs={12}>
                    <Typography variant="h6">{item.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Posted by:{item.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        {moment(item.createdAt).fromNow()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <img
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            backgroundPosition: "center",
                        }}
                        src={item.selectedFile}
                        alt=""
                    />
                </Grid>
            </Grid>
        </ButtonBase>
    );
}

export default Recommendation;
