// Third part imports
import express from "express";
import dotenv from "dotenv";

// Middleware
dotenv.config();

const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Hello from AuthKit");
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
