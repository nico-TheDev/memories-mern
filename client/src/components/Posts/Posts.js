import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../reducers/posts";
import Post from "./Post/Post";

function Posts() {
    const posts = useSelector((state) => state.posts.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        console.log(posts, "HAHA");
    }, [dispatch, posts]);

    return (
        <>
            <div>Posts Here</div>
            <Post />
        </>
    );
}

export default Posts;
