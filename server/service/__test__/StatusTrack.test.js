const request = require('supertest');
const app = require("../app")
const { User, CrowdFunding, StatusTracking, CrowdFundingProduct } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");


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
            firstName: 'JOJO',
            lastName: 'Doe',
            email: 'jojo@mail.com',
            password: passwordEncryptor('123456'),
            phoneNumber: '081234567890',
            address: 'Jl. Kebon Kacang sebelah',
        },
    ])
    
    await CrowdFunding.bulkCreate([
        {
            productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
            UserId: 1,
            targetQuantity: 200,
            initialProductPrice: 100000,
            finalProductPrice: 125000,
            manufactureName: "Dongyang Huanyao Industry And Trade Co",
            linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
            status: "Open",
            currentQuantity: 170,
            startDate: "2022-06-19T16:14:16.940Z",
            productImage: "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
            initialQuantity: 100,
            expiredDay: 10,
            hscode: "62111100",
            createdAt: "2022-06-18T16:14:16.940Z",
            updatedAt: "2022-06-18T16:14:16.940Z",
        }  
    ])
    await CrowdFundingProduct.bulkCreate([
        {
            CrowdFundingId: 1,
            UserId: 2,
            quantityToBuy : 10,
            totalPrice : 40000,
            paymentStatus : "Paid",
        }
    ])
})

describe("Status Tracking Test", () => {
    it("should return Status Tracking created successfully", async () => {
        const res = await request(app).post("/status")
        .send({CrowdFundingId : 1, status: "OnTrack", description: "Stuff"})
        .expect(201);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("Status Tracking created successfully");
        expect(res.body.data).toStrictEqual(expect.any(Object));
        expect(res.body.data.CrowdFundingId).toBe(1);
        expect(res.body.data.status).toStrictEqual(expect.any(String));
        expect(res.body.data.description).toStrictEqual(expect.any(String));
    });
    it("should return All Status Tracking", async () => {
        const res = await request(app).get("/status")
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("All Status Tracking");
        expect(res.body.data).toStrictEqual(expect.any(Array));
        expect(res.body.data[0].CrowdFundingId).toBe(1);
        expect(res.body.data[0].status).toStrictEqual(expect.any(String));
        expect(res.body.data[0].description).toStrictEqual(expect.any(String));
    });
    it("should return All Status Tracking", async () => {
        const res = await request(app).get("/status/1/all-participant")
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("All Status Tracking");
        expect(res.body.data).toStrictEqual(expect.any(Array));
    });
    it("should return Internal Server Error", async () => {
        const res = await request(app).get("/status/2/all-participant")
        .expect(500);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("Internal Server Error");
    });
    it("should return Status Tracking", async () => {
        const res = await request(app).get("/status/1")
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.data).toStrictEqual(expect.any(Array));
    });
})


afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await CrowdFundingProduct.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await CrowdFunding.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})