import React from "react";
import {
    AppBar,
    Avatar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import memories from "../../images/memories.png";
import classes from "./styles";

function Nav() {
    const user = null;

    return (
        <AppBar position="static" color="inherit" sx={classes.appBar}>
            <Box sx={classes.brandContainer}>
                <Typography
                    variant="h2"
                    component={Link}
                    to="/"
                    align="center"
                    sx={classes.heading}
                >
                    Memories
                </Typography>
                <img
                    src={memories}
                    alt="memories"
                    height="50"
                    sx={classes.image}
                />
            </Box>

            <Toolbar sx={classes.toolbar}>
                {user ? (
                    <Box sx={classes.profile}>
                        <Avatar
                            sx={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography sx={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        color="primary"
                        variant="contained"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
