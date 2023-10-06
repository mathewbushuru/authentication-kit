import request from "supertest";

import app from "../app.js";

describe("GET /", () => {
//   it.todo("responds with welcome message", (done) => {
//     request(app).get("/").expect(200, "hello", done);
//   });

  it("responds with welcome message - async", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  })
});


