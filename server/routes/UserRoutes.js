import express from "express";
import { signin_post, signup_post } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signin", signin_post);
router.post("/signin", signup_post);

export default router;
