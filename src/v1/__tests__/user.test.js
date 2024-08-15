// tests/user.test.js

const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("../src/routes");

const app = express();
app.use(bodyParser.json());
app.use("/v1", apiRoutes);

describe("User API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/v1/user/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  // Other tests...
});
