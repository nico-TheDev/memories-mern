import PostMessage from "../models/PostMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json({ data: postMessages });
    } catch (err) {
        res.status(404).json({
            message: error,
        });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    console.log(searchQuery);
    console.log(tags);

    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });
        console.log(posts);
        res.status(200).json({ posts });
    } catch (err) {
        res.status(404).json({ message: err });
    }
};

export const createPost = async (req, res) => {
    const post = req.body.data;

    if (!req.userId)
        return res.status(400).json({ message: "Unauthorized Token" });

    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
        name: post.creator,
        tags: post.tags.split(","),
    });
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No Post with that ID");
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            { ...post, _id: id },
            {
                new: true,
            }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: err });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No Post with that ID");
    }

    try {
        await PostMessage.findByIdAndDelete(id);
        res.status(200).json("Post Deleted Successfully");
    } catch (err) {
        res.status(409).json({ message: err });
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId)
        return res.status(400).json({ message: "Unauthorized Token" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No Post with that ID");
    }

    try {
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        // LIKE POST
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            // DISLIKE POST
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
            new: true,
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: err });
    }
};
