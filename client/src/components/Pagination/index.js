import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts, getPostsBySearch } from "../../feature/postSlice";

function Paginate({ page }) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const numberOfPages = useSelector((state) => state.posts.numberOfPages);

    useEffect(() => {
        if (page) {
            dispatch(getAllPosts(page));
        }
    }, [page, dispatch]);

    return (
        <Pagination
            sx={{ ".MuiPagination-ul": { justifyContent: "space-around" } }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
}

export default Paginate;
