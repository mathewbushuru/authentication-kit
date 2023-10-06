import { getAllUsers, getUserById } from "../database/utils.js";
/**
 * @desc: Get all users, if token is verified as valid
 * @listens: GET /admin/all-users
 * @access: private
 */
export const getAllUsersController = async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
};
/**
 * @desc: Get user by id, if token is verified as valid
 * @listens: GET /admin/user/:id
 * @access: private
 */
export const getUserByIdController = async (req, res) => {
    const id = +req.params.id;
    const userData = await getUserById(id);
    res.json(userData);
};
