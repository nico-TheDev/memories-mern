import jwt from "jsonwebtoken";

const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "testToken");
            req.userId = decodedData?.id;
        } else {
            // GOOGLE TOKEN
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
};

export default verifyAuth;
