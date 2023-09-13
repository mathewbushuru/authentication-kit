import { Request, Response } from "express";

import { getAllUsers, getUserById } from "../database/utils.js";

/**
 * @desc: Get all users
 * @listens: GET /admin/all-users
 * @access: public
 */
export const getAllUsersController = async (req: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
};

/**
 * @desc: Get user by id
 * @listens: GET /admin/user/:id
 * @access: public
 */
export const getUserByIdController = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const userData = await getUserById(id);
  res.json(userData);
};
