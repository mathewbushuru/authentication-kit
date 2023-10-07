import request from "supertest";

// @ts-ignore: Running jest on compiled javascript
import app from "../../dist/app.js";
// @ts-ignore: Running jest on compiled javascript
import verifyToken from "../../dist/middleware/auth-jwt.js";
// @ts-ignore: Running jest on compiled javascript
import { getAllUsers, getUserById } from "../../dist/database/utils.js";

// admin routes use verify token middleware
// we mock this middleware here to allow us to test different conditions
// This allows us to simulate different conditions. (Valid token, expired token, no token)
jest.mock("../../dist/middleware/auth-jwt", () => {
  return jest.fn((req, res, next) => next());
});

// mock db utilities
jest.mock("../../dist/database/utils", () => {
  return {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
  };
});

describe("Admin routes", () => {
  describe("GET /admin/all-users", () => {
    it("should retrieve all users when JWT token is valid", async () => {
      // mock middleware to simulate valid token
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        // mocked userId from decoded token
        req.userId = 1;
        next();
      });

      // mock database response
      (getAllUsers as jest.Mock).mockResolvedValue([
        {
          id: 1,
          username: "matt",
          email: "matt@test.com",
          hashedPassword:
            "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
          phoneNumber: "123-456-7890",
          emailNotifications: 1,
          emailVerified: 0,
          createdAt: "2023-10-04T01:48:29.000Z",
          updatedAt: "2023-10-04T01:48:29.000Z",
        },
        {
          id: 2,
          username: "mathew",
          email: "mathew@test.com",
          hashedPassword:
            "$2b$10$iSCS3B5TkLSVluFigswbJeVLuyjKuBJgLTOAGP4tkCZXHiGm7tChu",
          phoneNumber: null,
          emailNotifications: 0,
          emailVerified: 0,
          createdAt: "2023-10-04T05:30:40.000Z",
          updatedAt: "2023-10-04T05:30:40.000Z",
        },
      ]);

      const response = await request(app).get("/admin/all-users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 1,
          username: "matt",
          email: "matt@test.com",
          hashedPassword:
            "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
          phoneNumber: "123-456-7890",
          emailNotifications: 1,
          emailVerified: 0,
          createdAt: "2023-10-04T01:48:29.000Z",
          updatedAt: "2023-10-04T01:48:29.000Z",
        },
        {
          id: 2,
          username: "mathew",
          email: "mathew@test.com",
          hashedPassword:
            "$2b$10$iSCS3B5TkLSVluFigswbJeVLuyjKuBJgLTOAGP4tkCZXHiGm7tChu",
          phoneNumber: null,
          emailNotifications: 0,
          emailVerified: 0,
          createdAt: "2023-10-04T05:30:40.000Z",
          updatedAt: "2023-10-04T05:30:40.000Z",
        },
      ]);
    });

    it("should reject when jwt token is missing", async () => {
      // mock middleware to simulate no token
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(403).json({ errorMessage: "No token provided" });
      });

      const response = await request(app).get("/admin/all-users");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({ errorMessage: "No token provided" });
    });

    it("should reject when jwt token is invalid or expired", async () => {
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        return res
          .status(401)
          .json({ errorMessage: "Unauthorized - Wrong JWT token" });
      });

      const response = await request(app).get("/admin/all-users");
      expect(response.status).toBe(401);
    });
  });

  describe("GET /admin/user/:id", () => {
    it("should retrieve a user ny ID when the JWT token is valid", async () => {
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        req.userId = 1;
        next();
      });

      (getUserById as jest.Mock).mockResolvedValue({
        id: 1,
        username: "matt",
        email: "matt@test.com",
        hashedPassword:
          "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
        phoneNumber: "123-456-7890",
        emailNotifications: 1,
        emailVerified: 0,
        createdAt: "2023-10-04T01:48:29.000Z",
        updatedAt: "2023-10-04T01:48:29.000Z",
      });

      const response = await request(app).get("/admin/user/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        username: "matt",
        email: "matt@test.com",
        hashedPassword:
          "$2b$10$ejAQa8JhDYXLYapXWGBMVeO8lLOtt/CBZf51NpMkq0HZowbgZQETa",
        phoneNumber: "123-456-7890",
        emailNotifications: 1,
        emailVerified: 0,
        createdAt: "2023-10-04T01:48:29.000Z",
        updatedAt: "2023-10-04T01:48:29.000Z",
      });
    });

    it("should reject when jwt token is missing", async () => {
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(403).json({ errorMessage: "No token provided" });
      });

      const response = await request(app).get("/admin/user/1");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({ errorMessage: "No token provided" });
    });

    it("should reject when jwt token is invalid or expired", async () => {
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        return res
          .status(401)
          .json({ errorMessage: "Unauthorized - Wrong JWT token" });
      });

      const response = await request(app).get("/admin/user/1");
      expect(response.status).toBe(401);
    });

    it("should handle the case where the user doesnt exist", async () => {
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        req.userId = 1;
        next();
      });

      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/admin/user/999999999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({errorMessage: "User not found"});
    })
  });
});
