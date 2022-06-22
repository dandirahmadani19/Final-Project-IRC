const request = require('supertest');
const app = require("../app")
const { User, CrowdFunding, Balance,  } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");


beforeEach(() => {
    jest.restoreAllMocks()
})

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
        },
        {
            firstName: 'jojo',
            lastName: 'Doe',
            email: 'jojo@mail.com',
            password: passwordEncryptor('123456'),
            phoneNumber: '0812344567890',
            address: 'Jl. Kebon Kacang Sebelah',
        }
    ])
    await Balance.bulkCreate([
        {
            UserId: 1,
            amount: 2500000,
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

describe("Crowd Funding Testing Test", () => {
    it("should return True if Amount Bigger than Total Price", async () => {
        jest.spyOn(CrowdFunding, 'findAll').mockRejectedValue('Internal Server Error')
        return request(app)
        .get(`/crowdFund`)
        .then((res) => {
          expect(res.status).toBe(500)
        })
        .catch((err) => {
          console.log(err)
        })
    });
    it("should return False if Amount Smaller than Total Price", async () => {
        const res = await request(app).get(`/balance/check-balance/${1200000}`)
        .set("access_token", access_token)
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.isEnough).toBe(true);
    });
    it("should return Error authentication", async () => {
        const res = await request(app).get(`/balance/check-balance/${1200000}`)
        .expect(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Error authentication, must login first");
    });
    it("should return All data balance", async () => {
        const res = await request(app).get(`/balance`)
        .expect(200);
        expect(res.body).toEqual(expect.any(Array));
    });
    
})


afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await CrowdFunding.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await Balance.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

