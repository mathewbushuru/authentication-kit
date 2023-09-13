import { NextFunction, Request, Response } from "express";

import { createUser, getUserById, getUserByEmail } from "../database/utils.js";
import { LoginDataType, SignupDataType } from "./types.js";

/**
 * @desc: login user and (TODO:) generate token
 * @listens: POST /auth/login
 * @access: public
 */
export const postLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginReqData = req.body as LoginDataType;

  if (!loginReqData.email) {
    const errorMessage = "Log in error, email is missing";
    console.error(errorMessage);
    return res.status(400).json(errorMessage);
  }

  if (!loginReqData.password) {
    const errorMessage = "Log in error, password is missing";
    console.error(errorMessage);
    return res.status(400).json(errorMessage);
  }

  getUserByEmail(loginReqData.email)
    .then((userData) => {
      console.log(userData);
      if (!userData) {
        const errorMessage = "Log in error, no such user";
        return res.status(401).json(errorMessage);
      }

      //TODO: hash password through bcrypt
      const hashedReqDataPassword = loginReqData.password;

      const { hashedPassword, ...userDataWithoutPassword } = userData;
      if (hashedPassword !== hashedReqDataPassword) {
        const errorMessage = "Log in error, wrong password";
        console.error(errorMessage);
        return res.status(401).json(errorMessage);
      }

      console.log("Log in successful");
      res.json(userDataWithoutPassword);
    })
    .catch((err) => {
      return next(err);
    });
};

/**
 * @desc: signup user
 * @listens: POST /auth/signup
 * @access: public
 */
export const postSignupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signupReqData = req.body as SignupDataType;

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

  if (!signupReqData.username) {
    const errorMessage = "Sign up error, username is missing";
    console.error(errorMessage);
    return res.status(500).json(errorMessage);
  }

  //TODO: hash password through bcrypt
  const hashedReqDataPassword = signupReqData.password;

  createUser(
    signupReqData.username,
    signupReqData.email,
    hashedReqDataPassword,
    signupReqData.emailNotifications,
    signupReqData.phoneNumber
  )
    .then((createUserResponse) => {
      console.log("Sign up successful");
      const { hashedPassword, ...userDataWithoutPassword } = createUserResponse;
      res.status(201).json(userDataWithoutPassword);
    })
    .catch((err) => {
      return next(err);
    });
};
