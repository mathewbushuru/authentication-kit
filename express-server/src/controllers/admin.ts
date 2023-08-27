import { Request, Response } from "express";

import { getAllUsers, getUserById } from "../database/utils.js";

export const getAllUsersController = async (req: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const userData = await getUserById(id);
  res.json(userData);
};
