import jwt from "jsonwebtoken";

const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
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
    }
};

export default verifyAuth;
