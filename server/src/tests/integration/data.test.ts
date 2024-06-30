import request from "supertest";
import express from "express";
import dataRoutes from "../../routes/dataRoutes"
import { describe } from "node:test";

const app = express();
app.use(express.json());
app.use("/", dataRoutes);

const MOCK_USER = {
  userEmail: 'user@example.com',
  password: 'firstkey123'
};

let token: string = ''; 

describe("Routes integration tests", () => {
  // Before start tests, make login to get a token
  beforeEach(async () => {
    const authResponse = await request(app)
      .post('/authenticate')
      .send(MOCK_USER);

    token = authResponse.body.token; // Save the token 
  });

  it('Should authenticate with POST method', async () => {
    const response = await request(app)
      .post(`/authenticate`)
      .send(MOCK_USER);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('Should update user with PUT method', async () => {
    const response = await request(app)
      .put(`/${MOCK_USER.userEmail}`)
      .send({ password: 'newPassword123' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated with success!');
  });

  it('Should get error in authenticate', async () => {
    // Now user is updated and don't have the same password
    const errorResponse = await request(app)
      .post('/authenticate')
      .send(MOCK_USER);

    expect(errorResponse.status).toBe(401); 
    expect(errorResponse.body.error).toBe("Invalid password");
  });
})