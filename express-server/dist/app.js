// Third party imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Routes imports
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
// Custom middleware imports
import verifyToken from "./middleware/auth-jwt.js";
const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to AuthKit's API" });
});
app.use("/auth", authRoutes);
app.use("/admin", verifyToken, adminRoutes);
app.use((req, res, next) => {
    const errorMessage = "404 Error - Not found";
    console.log(errorMessage);
    return res.status(404).json({ errorMessage });
});
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ errorMessage: "Something went wrong", ...error });
});
export default app;
