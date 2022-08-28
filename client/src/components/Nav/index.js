import React, { useCallback, useEffect } from "react";
import {
    AppBar,
    Avatar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import memories from "../../images/memories.png";
import classes from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../feature/authSlice";

function Nav() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        dispatch(LOGOUT());
        navigate("/");
    }, [dispatch, navigate]);

    useEffect(() => {
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
    }, [location, handleLogout, token]);

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
                            alt={user?.name}
                            src={user?.picture}
                        >
                            {user?.name?.charAt(0)}
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
