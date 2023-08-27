// Third party imports
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Routes imports
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Welcome to AuthKit's API" });
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ errorMessage: "Something went wrong" });
});

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Authkit App's server running on port ${process.env.PORT || 3001}`
  );
});

export default app;
