import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
// ROUTES IMPORT

dotenv.config();

import postRoutes from "./routes/PostRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();

// MIDDLERWARES
app.use(
    express.json({
        limit: "30mb",
        extended: true,
    })
);
app.use(
    express.urlencoded({
        limit: "30mb",
        extended: true,
    })
);
app.use(cors());

// ROUTES

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// MONGOOSE SETUP
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
