const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bugRoutes = require("../../src/routes/bugRoutes.js");

const app = express();
app.use(express.json());
app.use("/api/bugs", bugRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Bug API", () => {
  it("should create a new bug", async () => {
    const res = await request(app).post("/api/bugs").send({
      title: "Bug #1",
      description: "This is the first bug",
      status: "open",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Bug #1");
  });

  it("should fetch all bugs", async () => {
    const res = await request(app).get("/api/bugs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
