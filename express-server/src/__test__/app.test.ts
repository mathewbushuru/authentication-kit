import request from "supertest";

// @ts-ignore: Running jest on compiled javascript
import app from "../../dist/app";

describe("GET /", () => {
  it("responds with welcome message", (done) => {
    request(app)
      .get("/")
      .expect(200, { message: "Welcome to AuthKit's API" }, done);
  });

  it("responds with welcome message - async", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to AuthKit's API" });
  });
});

describe("404 Handler", () => {
  it("should respond with a 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({errorMessage: "404 Error - Not found"});
  });
});
