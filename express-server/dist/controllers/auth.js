"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = exports.loginController = void 0;
const loginController = (req, res) => {
    const loginReqData = req.body;
    if (!loginReqData.email) {
        const errorMessage = "Log in error, email is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    if (!loginReqData.password) {
        const errorMessage = "Log in error, password is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    console.log("Log in successful");
    res.json(loginReqData);
};
exports.loginController = loginController;
const signupController = (req, res) => {
    const signupReqData = req.body;
    if (!signupReqData.email) {
        const errorMessage = "Sign up error, email is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    if (!signupReqData.password) {
        const errorMessage = "Sign up error, password is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    if (!signupReqData.firstName) {
        const errorMessage = "Sign up error, first name is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    if (!signupReqData.lastName) {
        const errorMessage = "Sign up error, last name is missing";
        console.error(errorMessage);
        return res.status(500).json(errorMessage);
    }
    console.log("Sign up successful");
    res.json(signupReqData);
};
exports.signupController = signupController;
