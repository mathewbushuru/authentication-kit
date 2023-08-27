"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Third party imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
// Routes imports
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Routes
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to AuthKit's API" });
});
app.use("/auth", auth_1.default);
// Start server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Authkit App's server running on port ${process.env.PORT || 3001}`);
});
exports.default = app;
