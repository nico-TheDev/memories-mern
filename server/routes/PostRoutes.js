import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("HELLO POST ROUTES");
});

export default router;
