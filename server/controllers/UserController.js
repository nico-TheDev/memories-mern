import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signin_post = async (req, res) => {
    const { email, password } = req.body.data;
    try {
        // FIND THE EXISTING USER
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User does not exist." });

        // USE BCRYPT TO COMPARE PASSWORDS

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser.id,
            },
            "testToken",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong", error: err });
    }
};

export const signup_post = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } =
        req.body.data;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword)
            return res.status(400).json({ message: "Password does not match" });

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            {
                email: result.email,
                id: result.id,
            },
            "testToken",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result, token });
    } catch (err) {
        console.log(err);
    }
};
