import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

apiInstance.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        const token = JSON.parse(localStorage.getItem("token"));
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export const fetchPosts = (page) => apiInstance.get(`/posts?page=${page}`);
export const fetchPost = (id) => apiInstance.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
    apiInstance.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
    );

export const createPost = (newPost) => apiInstance.post("/posts", { data: newPost });

export const updatePost = (id, updatedPost) =>
    apiInstance.patch(`/posts/${id}`, { data: updatedPost });

export const deletePost = (id) => apiInstance.delete(`/posts/${id}`);

export const likePost = (id) => apiInstance.patch(`/posts/${id}/like`);

export const commentPost = (comment, id) =>
    apiInstance.post(`/posts/${id}/commentPost`, { data: comment });

// AUTH

export const signIn = (formData) => apiInstance.post("/user/signin", { data: formData });
export const signUp = (formData) => apiInstance.post("/user/signup", { data: formData });
