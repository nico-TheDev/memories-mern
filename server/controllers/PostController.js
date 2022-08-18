import PostMessage from "../models/PostMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json({ data: postMessages });
    } catch (err) {
        res.status(404).json({
            message: error,
        });
    }
};
export const createPost = async (req, res) => {
    const post = req.body.data;
    console.log(post);

    const newPost = new PostMessage(post);
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
