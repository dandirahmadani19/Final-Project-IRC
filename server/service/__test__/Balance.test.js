const request = require('supertest');
const app = require("../app")
const { User, Balance } = require('../models/index');
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
  await Balance.bulkCreate([
    {
        UserId: 1,
        amount: 1000000,
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


describe("Balance Test", () => {
    it("should return True if Amount Bigger than Total Price", async () => {
        const res = await request(app).get(`/balance/check-balance/${900000}`)
        .set("access_token", access_token)
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.isEnough).toBe(true);
    });
    it("should return False if Amount Smaller than Total Price", async () => {
        const res = await request(app).get(`/balance/check-balance/${1200000}`)
        .set("access_token", access_token)
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.isEnough).toBe(false);
    });
})

afterAll(async () => {
    await Balance.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
  })