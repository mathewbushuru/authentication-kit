import { NextFunction, Request, Response } from "express";

import { createUser, getUserById } from "../database/utils.js";
import { LoginDataType, SignupDataType } from "./types.js";

export const postLoginController = async (req: Request, res: Response) => {
  const loginReqData = req.body as LoginDataType;

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

  if (!loginReqData.id) {
    const errorMessage = "Log in error, id is missing";
    console.error(errorMessage);
    return res.status(500).json(errorMessage);
  }

  const userData = (await getUserById(
    +loginReqData.id
  )) as unknown as LoginDataType;

  if (userData.password !== loginReqData.password) {
    const errorMessage = "Log in error, wrong password";
    console.error(errorMessage);
    return res.status(500).json(errorMessage);
  }

  console.log("Log in successful");

  res.json(userData);
};

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

  createUser(
    signupReqData.username,
    signupReqData.email,
    signupReqData.password,
    signupReqData.emailNotifications,
    signupReqData.phoneNumber
  )
    .then((createUserResponse) => {
      console.log("Sign up successful");
      res.status(201).json(createUserResponse);
    })
    .catch((err) => {
      return next(err);
    });
};
