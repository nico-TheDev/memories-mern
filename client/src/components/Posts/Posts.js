import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/postSlice";
import Post from "./Post/Post";

function Posts() {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, posts]);

    return (
        <>
            <div>Posts Here</div>
            <Post />
        </>
    );
}

export default Posts;
