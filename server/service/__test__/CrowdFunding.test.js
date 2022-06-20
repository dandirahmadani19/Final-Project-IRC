const request = require('supertest');
const app = require("../app")
const { User, CrowdFunding, Balance } = require('../models/index');
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
            amount: 2500000,
        }
    ])
    await CrowdFunding.bulkCreate([
        {
            productName:
                "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
            UserId: 1,
            targetQuantity: 200,
            initialProductPrice: 100000,
            finalProductPrice: 125000,
            manufactureName: "Dongyang Huanyao Industry And Trade Co",
            linkProduct:
                "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
            status: "Open",
            currentQuantity: 170,
            startDate: "2022-06-19T16:14:16.940Z",
            productImage:
                "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
            initialQuantity: 100,
            expiredDay: 10,
            hscode: "62111100",
            createdAt: "2022-06-18T16:14:16.940Z",
            updatedAt: "2022-06-18T16:14:16.940Z",
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

describe("Crowdfunding Test", () => {
    it("should return All data Crowdfunding", async () => {
        const res = await request(app).get("/crowdFund").expect(200);
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0].id).toBe(1);
        expect(res.body[0].productName).toEqual("Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots");
        expect(res.body[0].UserId).toBe(1);
        expect(res.body[0].targetQuantity).toEqual(200);
        expect(res.body[0].initialProductPrice).toEqual(100000);
        expect(res.body[0].finalProductPrice).toEqual(125000);
        expect(res.body[0].manufactureName).toEqual('Dongyang Huanyao Industry And Trade Co');
        expect(res.body[0].linkProduct).toEqual('https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6');
        expect(res.body[0].status).toEqual("Open");
        expect(res.body[0].currentQuantity).toEqual(170);
        expect(res.body[0].startDate).toEqual("2022-06-19T16:14:16.940Z");
        expect(res.body[0].productImage).toEqual("https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg");
        expect(res.body[0].initialQuantity).toEqual(100);
        expect(res.body[0].expiredDay).toEqual(10);
        expect(res.body[0].hscode).toEqual("62111100");
        expect(res.body[0].CrowdFundingProducts).toEqual(expect.any(Array));
        expect(res.body[0].User).toEqual(expect.any(Object));
    });
    it("should return Balance is not enough", async () => {
        const res = await request(app).post("/crowdFund/add")
            .set("access_token", access_token)
            .send({
                productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
                initialProductPrice: 100000,
                initialQuantity: 2000,
                manufactureName: "Dongyang Huanyao Industry And Trade Co",
                linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6"
            })
            .expect(400);
        expect(res.body).toEqual(expect.any(Object));;
        expect(res.body.message).toEqual('Balance is not enough');
        // expect(res.body[0].productName).toEqual("Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots");
    });
    it("should return Balance is enough", async () => {
        const res = await request(app).post("/crowdFund/add")
            .set("access_token", access_token)
            .send({
                productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
                initialProductPrice: 100000,
                initialQuantity: 20,
                manufactureName: "Dongyang Huanyao Industry And Trade Co",
                linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6"
            })
            .expect(201);
        expect(res.body).toEqual(expect.any(Object));;
        expect(res.body.message).toEqual('CrowdFunding created');
        expect(res.body.data.targetQuantity).toEqual(null);
        expect(res.body.data.finalProductPrice).toEqual(null);
        expect(res.body.data.currentQuantity).toEqual(null);
        expect(res.body.data.startDate).toEqual(null);
        expect(res.body.data.productImage).toEqual(null);
        expect(res.body.data.expiredDay).toEqual(null);
        expect(res.body.data.hscode).toEqual(null);
    });
    it("should return data from get all history", async () => {
        const res = await request(app).get("/crowdFund/all-history-by-user-submit")
            .set("access_token", access_token)
            .expect(200);
        expect(res.body).toStrictEqual(expect.any(Array));;
        expect(res.body[0].CrowdFundingProducts).toStrictEqual(expect.any(Array));
        expect(res.body[0].User).toStrictEqual(expect.any(Object));
    });
    it("should return Crowd Funding success to open in approval", async () => {
        const res = await request(app).patch(`/crowdFund/approve/${1}`)
            .set("access_token", access_token)
            .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toEqual("Crowd Funding success to open");
    });
    it("should return Crowd Funding verified, waiting approval from User", async () => {
        const res = await request(app).patch(`/crowdFund/verif/${1}`)
            .set("access_token", access_token)
            .send({
                productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
                initialProductPrice: 100000,
                initialQuantity: 20,
                manufactureName: "Dongyang Huanyao Industry And Trade Co",
                linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
                productWeight: 10,
                productImage: "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
                hscode: 656534,
                expiredDay: 10
            })
            .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toEqual("Crowd Funding verified, waiting approval from User");
        expect(res.body.data).toStrictEqual(expect.any(Object));
    });
    it("should return Internal Server Error From Verified Endpoint", async () => {
        const res = await request(app).patch(`/crowdFund/verif/${1}`)
            .set("access_token", access_token)
            .expect(500);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toEqual("Internal Server Error");
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

