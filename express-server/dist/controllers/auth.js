import jwt from "jsonwebtoken";
import { createUser, getUserById, getUserByEmail } from "../database/utils.js";
import { hashPassword, checkUserPassword } from "../lib/auth.js";
/**
 * @desc: login user and generate JWT token
 * @listens: POST /auth/login
 * @access: public
 */
export const postLoginController = async (req, res, next) => {
    const loginReqData = req.body;
    if (!loginReqData.email) {
        const errorMessage = "Log in error, email is missing";
        console.error(errorMessage);
        return res.status(400).json({ errorMessage });
    }
    if (!loginReqData.password) {
        const errorMessage = "Log in error, password is missing";
        console.error(errorMessage);
        return res.status(400).json({ errorMessage });
    }
    const userData = await getUserByEmail(loginReqData.email);
    console.log(userData);
    if (!userData) {
        const errorMessage = "Log in error, no such user";
        return res.status(401).json({ errorMessage });
    }
    const { hashedPassword, ...userDataWithoutPassword } = userData;
    const passwordMatches = await checkUserPassword(loginReqData.password, hashedPassword);
    if (passwordMatches) {
        console.log("Login successful");
        const secondsToExpire = 24 * 60 * 60;
        const jwtToken = jwt.sign({ userId: userDataWithoutPassword.id }, process.env.JWT_SECRET_KEY, { algorithm: "HS256", expiresIn: secondsToExpire });
        res.json({ userData: userDataWithoutPassword, jwtToken });
    }
    else {
        const errorMessage = "Log in error, wrong password";
        return res.status(401).json({ errorMessage });
    }
};
/**
 * @desc: signup user
 * @listens: POST /auth/signup
 * @access: public
 */
export const postSignupController = async (req, res, next) => {
    const signupReqData = req.body;
    if (!signupReqData.email) {
        const errorMessage = "Sign up error, email is missing";
        console.error(errorMessage);
        return res.status(400).json({ errorMessage });
    }
    if (!signupReqData.password) {
        const errorMessage = "Sign up error, password is missing";
        console.error(errorMessage);
        return res.status(400).json({ errorMessage });
    }
    if (!signupReqData.username) {
        const errorMessage = "Sign up error, username is missing";
        console.error(errorMessage);
        return res.status(400).json({ errorMessage });
    }
    const hashedReqDataPassword = await hashPassword(signupReqData.password);
    createUser(signupReqData.username, signupReqData.email, hashedReqDataPassword, signupReqData.emailNotifications, signupReqData.phoneNumber, false)
        .then((createUserResponse) => {
        if (createUserResponse === null) {
            const errorMessage = "There was an issue signing up. Try again";
            return res.status(500).json({ errorMessage });
        }
        console.log("Sign up successful");
        const { hashedPassword, ...userDataWithoutPassword } = createUserResponse;
        res.status(201).json(userDataWithoutPassword);
    })
        .catch((err) => {
        return next(err);
    });
};
/**
 * @desc: Send back returning user's data after the JWT token in the request header is validated by verifyToken middleware
 * @listens: GET /auth/verify-token
 * @access: private
 */
export const getVerifiedUserData = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    const userData = await getUserById(userId);
    if (userData === null) {
        const errorMessage = "There was an error fetching user data. Try again";
        return res.status(500).json({ errorMessage });
    }
    const { hashedPassword, ...userDataWithoutPassword } = userData;
    console.log(userData);
    return res.json(userDataWithoutPassword);
};
