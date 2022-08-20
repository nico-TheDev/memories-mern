import React, { useState } from "react";
import {
    Paper,
    Avatar,
    Grid,
    Typography,
    Container,
    Button,
    Box,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { GET_USER } from "../../../feature/authSlice";
import Input from "./Input";
import classes from "./styles";

function AuthPage() {
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const handleShowPassword = () => {
        setIsPasswordShown(!isPasswordShown);
    };
    const handleSubmit = () => {};

    const handleChange = () => {};

    const handleSwitchMode = () => {
        setIsSignup(!isSignup);
    };

    const handleLoginSuccess = (response) => {
        const { email, name, picture } = jwtDecode(response.credential);
        dispatch(GET_USER({ email, name, picture }));
    };

    const handleLoginError = (response) => {
        console.log("Login Failed", response);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={classes.paper} elevation={3}>
                <Avatar sx={classes.avatar}>
                    <LockIcon />
                </Avatar>

                <Typography variant="h5" mb={4}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>

                <form sx={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    half
                                    autoFocus
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={isPasswordShown ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Box my={2}>
                        <Button variant="contained" fullWidth color="primary">
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                    </Box>
                    <Box my={2}>
                        <Button
                            sx={{ textAlign: "center" }}
                            onClick={handleSwitchMode}
                            fullWidth
                            variant="outlined"
                        >
                            {isSignup
                                ? "Already have an account? Sign In"
                                : "Don't have an account ? Sign Up"}
                        </Button>
                    </Box>

                    <GoogleLogin
                        shape="rectangular"
                        theme="filled_blue"
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                </form>
            </Paper>
        </Container>
    );
}

export default AuthPage;
