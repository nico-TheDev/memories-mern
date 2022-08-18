import axios from "axios";

const url = `http://localhost:5000/posts`;

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, { data: newPost });

export const updatePost = (id, updatedPost) =>
    axios.patch(`${url}/${id}`, { data: updatedPost });

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/like`);
