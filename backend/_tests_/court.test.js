//import app from '../controllers/User'
import app from "../index.js";
import request from "supertest";

describe("Court", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/api/court");
    expect(response.statusCode).toBe(200);
  });
});