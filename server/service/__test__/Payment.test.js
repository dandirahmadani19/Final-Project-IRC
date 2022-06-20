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

describe("Payment Test", () => {
    it("should return payment token", async () => {
        const res = await request(app).post(`/payment`)
        .set("access_token", access_token)
        .send({addAmount: 1000000})
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.redirect_url).toEqual(expect.any(String))
    });
    it("should return Internal Server Error", async () => {
        const res = await request(app).post(`/payment`)
        .set("access_token", access_token)
        .expect(500);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toEqual("Internal Server Error");
    });
})
describe("TopUp Payment Test", () => {
    it("should return TopUp Success", async () => {
        const res = await request(app).post(`/payment/success`)
        .set("access_token", access_token)
        .send({addAmount: 1000000})
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toEqual("Topup Success")
    });
    it("should return Internal Server Error", async () => {
        const res = await request(app).post(`/payment/success`)
        .set("access_token", access_token)
        .expect(500);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toEqual("Internal Server Error");
    });
})


afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

