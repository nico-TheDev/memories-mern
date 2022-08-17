import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json({ data: postMessages });
    } catch (err) {
        res.status(404).json({
            message: error.message,
        });
    }
};
export const createPosts = async (req, res) => {
    const post = req.body.data;
    console.log(post);

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};
