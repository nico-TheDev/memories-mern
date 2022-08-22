import React, { useState, useEffect } from "react";
import {
    AppBar,
    Avatar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import memories from "../../images/memories.png";
import classes from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../feature/authSlice";

function Nav() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(LOGOUT());
        navigate("/");
    };

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
                    Memoir
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
                            alt={user.name}
                            src={user.picture}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography sx={classes.userName} variant="h6">
                            {user.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                        >
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
