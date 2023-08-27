"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Third part imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Middleware
dotenv_1.default.config();
const app = (0, express_1.default)();
// Routes
app.get("/", (req, res) => {
    res.send("Hello from AuthKit");
});
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});
