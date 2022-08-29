import React from "react";
import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Nav from "./components/Nav";
// PAGES
import HomePage from "./components/pages/Home";
import AuthPage from "./components/pages/Auth";
import PostDetails from "./components/pages/PostDetails";
import { useSelector } from "react-redux";

const App = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Container maxWidth="xl" sx={{ paddingY: 4, paddingBottom: 6 }}>
            <Toaster />
            <Nav />
            <Routes>
                <Route path="/" element={<Navigate to="/posts" />} replace />
                <Route path="/posts" element={<HomePage />} />
                <Route path="/posts/search" element={<HomePage />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route
                    path="/auth"
                    element={!user ? <AuthPage /> : <Navigate to="/posts" />}
                />
            </Routes>
        </Container>
    );
};

export default App;
