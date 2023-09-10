// Third party imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Routes imports
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to AuthKit's API" });
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ errorMessage: "Something went wrong", ...error });
});
// Start server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Authkit App's server running on port ${process.env.PORT || 3001}`);
});
export default app;
