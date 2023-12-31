import request from "supertest";
import jwt from "jsonwebtoken";
// @ts-ignore: Running jest on compiled javascript
import app from "../../dist/app.js";
import { createUser, getUserByEmail,
// @ts-ignore: Running jest on compiled javascript
 } from "../../dist/database/utils.js";
// @ts-ignore: Running jest on compiled javascript
import { hashPassword, checkUserPassword } from "../../dist/lib/auth.js";
jest.mock("../../dist/database/utils.js", () => {
    return {
        createUser: jest.fn(),
        getUserById: jest.fn(),
        getUserByEmail: jest.fn(),
    };
});
jest.mock("../../dist/lib/auth.js", () => {
    return {
        hashPassword: jest.fn(),
        checkUserPassword: jest.fn(),
    };
});
jest.mock("jsonwebtoken");
describe("Auth routes", () => {
    describe("POST /auth/login", () => {
        it("should log in successfully and return user data and JWT token", async () => {
            const user = {
                id: 1,
                username: "matt",
                email: "matt@test.com",
                hashedPassword: "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
                phoneNumber: "123-456-7890",
                emailNotifications: 1,
                emailVerified: 0,
                createdAt: "2023-10-04T01:48:29.000Z",
                updatedAt: "2023-10-04T01:48:29.000Z",
            };
            const { hashedPassword, ...userDataWithoutPassword } = user;
            getUserByEmail.mockResolvedValue(user);
            checkUserPassword.mockResolvedValue(true);
            jwt.sign.mockReturnValue("signedToken");
            const response = await request(app)
                .post("/auth/login")
                .send({ email: "matt@test.com", password: "tester123" });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                userData: userDataWithoutPassword,
                jwtToken: "signedToken",
            });
        });
        it("should not log in if email is missing", async () => {
            const response = await request(app)
                .post("/auth/login")
                .send({ password: "tester123" });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                errorMessage: "Log in error, email is missing",
            });
        });
        it("should not log in if password is missing", async () => {
            const response = await request(app)
                .post("/auth/login")
                .send({ email: "matt@test.com" });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                errorMessage: "Log in error, password is missing",
            });
        });
        it("should not log in if user's email does not exist", async () => {
            getUserByEmail.mockResolvedValue(null);
            const response = await request(app)
                .post("/auth/login")
                .send({ email: "nonexistentuser@test.com", password: "tester123" });
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                errorMessage: "Log in error, no such user",
            });
        });
        it("should not log in if the password is wrong", async () => {
            getUserByEmail.mockResolvedValue({
                id: 1,
                username: "matt",
                email: "matt@test.com",
                hashedPassword: "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
                phoneNumber: "123-456-7890",
                emailNotifications: 1,
                emailVerified: 0,
                createdAt: "2023-10-04T01:48:29.000Z",
                updatedAt: "2023-10-04T01:48:29.000Z",
            });
            checkUserPassword.mockResolvedValue(false);
            const response = await request(app)
                .post("/auth/login")
                .send({ email: "matt@test.com", password: "wrongPassword" });
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                errorMessage: "Log in error, wrong password",
            });
        });
    });
    describe("POST /auth/signup", () => {
        it("should sign up successfully and return user data without the password", async () => {
            const user = {
                id: 1,
                username: "matt",
                email: "matt@test.com",
                hashedPassword: "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
                phoneNumber: "123-456-7890",
                emailNotifications: 1,
                emailVerified: 0,
                createdAt: "2023-10-04T01:48:29.000Z",
                updatedAt: "2023-10-04T01:48:29.000Z",
            };
            const { hashedPassword, ...userDataWithoutPassword } = user;
            hashPassword.mockResolvedValue(hashedPassword);
            createUser.mockResolvedValue(user);
            const response = await request(app).post("/auth/signup").send({
                email: "matt@test.com",
                password: "tester123",
                username: "matt",
            });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(userDataWithoutPassword);
        });
        it("should not sign up in if email is missing", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ password: "tester123", userName: "matt" });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                errorMessage: "Sign up error, email is missing",
            });
        });
        it("should not sign up if password is missing", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ email: "matt@test.com", username: "matt" });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                errorMessage: "Sign up error, password is missing",
            });
        });
        it("should not sign up if username is missing", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ email: "matt@test.com", password: "tester123" });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                errorMessage: "Sign up error, username is missing",
            });
        });
    });
});
