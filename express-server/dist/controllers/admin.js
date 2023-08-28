import { getAllUsers, getUserById } from "../database/utils.js";
export const getAllUsersController = async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
};
export const getUserByIdController = async (req, res) => {
    const id = +req.params.id;
    const userData = await getUserById(id);
    res.json(userData);
};
