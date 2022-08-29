const style = {
    media: {
        borderRadius: "20px",
        objectFit: "cover",
        width: "100%",
        maxHeight: "600px",
    },
    card: {
        display: "flex",
        width: "100%",
        flexWrap: {
            sm: "wrap",
            lg: "nowrap",
        },
        flexDirection: {
            sm: "column",
            lg: "row",
        },
    },
    section: {
        borderRadius: "20px",
        margin: "10px",
        flex: 1,
    },
    imageSection: {
        marginLeft: {
            lg: "20px",
            sm: 0,
        },
    },
    recommendedPosts: {
        display: "flex",
        flexDirection: {
            sm: "column",
            lg: "row",
        },
        gap: 4,
    },
    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "39vh",
    },
};

export default style;
