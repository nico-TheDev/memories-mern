import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ROUTES IMPORT

import postRoutes from "./routes/PostRoutes.js";

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

const CONNECTION_URL = `mongodb+srv://nico:1234@cluster0.mwvo1.mongodb.net/?retryWrites=true&w=majority`;
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
