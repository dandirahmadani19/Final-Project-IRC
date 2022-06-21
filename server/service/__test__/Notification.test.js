const request = require('supertest');
const app = require("../app")
const { User } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");
let access_token;
beforeAll(async () => {
    await User.bulkCreate([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'jhon@mail.com',
          password: passwordEncryptor('123456'),
          phoneNumber: '081234567890',
          address: 'Jl. Kebon Kacang',
        }
    ])
  access_token = tokenMakerFromPayload({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhon@mail.com',
    phoneNumber: '081234567890',
    address: 'Jl. Kebon Kacang',
  })
})

describe("User Admin Test", () => {
    it("should return tokenAssigned in notification Endpoint", async () => {
        const res = await request(app).post("/notification")
        .set("access_token", access_token)
        .send({expoToken: "ExponentPushToken[PkSS6NDnv0yZ1YPneQIqbz]"})
        .expect(201);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.tokenAssigned).toEqual(true);
    });
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})