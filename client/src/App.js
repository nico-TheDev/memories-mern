import React from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
// PAGES
import HomePage from "./components/pages/Home";
import AuthPage from "./components/pages/Auth";

const App = () => {
    return (
        <Container maxWidth="lg">
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Container>
    );
};

export default App;
