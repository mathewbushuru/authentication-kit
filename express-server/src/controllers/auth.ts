import { Request, Response } from "express";

import { LoginDataType, SignupDataType } from "./requestDataTypes";

export const loginController = (req: Request, res: Response) => {
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

  console.log("Log in successful");

  res.json(loginReqData);
};

export const signupController = (req: Request, res: Response) => {
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
