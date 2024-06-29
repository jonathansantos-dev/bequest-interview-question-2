import request from "supertest";
import express from "express";
import dataRoutes from "../../routes/dataRoutes"

const app = express();
app.use(express.json());
app.use("/data", dataRoutes);

describe("Data api", () => {
  it("Should get data and token", async () => {
    const response = await request(app).get("/data");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("token");
  })

  it("Should update data", async () => {
    const newData = "New Data";
    const response = await request(app).post("/data").send({ data: newData });
    expect(response.status).toBe(200);
  })

  it("Should verify data", async () => {
    const response = await request(app).get("/data/verify");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("verified");
  })

  it("Should recover data", async () => {
    const response = await request(app).get("/data/recover");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("token");
  })
});