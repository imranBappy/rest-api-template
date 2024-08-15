const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should login a user", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should get user information", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });

    const { token } = registerResponse.body;

    const userResponse = await request(app)
      .get("/api/auth/user")
      .set("Authorization", `Bearer ${token}`);

    expect(userResponse.statusCode).toBe(200);
    expect(userResponse.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should return 401 for unauthorized user", async () => {
    const response = await request(app).get("/api/auth/user");

    expect(response.statusCode).toBe(401);
  });
});
