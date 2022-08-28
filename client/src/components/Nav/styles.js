import { purple } from "@mui/material/colors";

const style = {
    appBar: {
        borderRadius: 2,
        marginBottom: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
    },
    heading: {
        color: "rgba(0,183,255, 1)",
        textDecoration: "none",
    },
    image: {
        marginLeft: "15px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "400px",
    },
    profile: {
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
    },
    userName: {
        display: "flex",
        alignItems: "center",
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    purple: {
        color: "white",
        backgroundColor: purple[500],
    },
};

export default style;
