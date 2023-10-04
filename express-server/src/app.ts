// Third party imports
import express, { Request, Response, NextFunction } from "express";
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
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Welcome to AuthKit's API" });
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const errorMessage = "404 Error - Not found";
  console.log(errorMessage);
  return res.status(404).json({ errorMessage });
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ errorMessage: "Something went wrong", ...error });
});

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Authkit App's server running on port ${process.env.PORT || 3001}`
  );
});

export default app;
