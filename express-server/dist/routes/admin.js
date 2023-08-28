import { Router } from "express";
import { getAllUsersController, getUserByIdController, } from "../controllers/admin.js";
const router = Router();
router.get("/all-users", getAllUsersController);
router.get("/user/:id", getUserByIdController);
export default router;
