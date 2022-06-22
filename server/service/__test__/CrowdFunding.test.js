const request = require('supertest');
const app = require("../app")
const { User, CrowdFunding, Balance, CrowdFundingProduct } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");


let access_token;
let access_token1q;
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
    access_token1 = tokenMakerFromPayload({
        id: 2,
        firstName: 'Johnoo',
        lastName: 'Doeoo',
        email: 'jhono@mail.com',
        phoneNumber: '081234567890o',
        address: 'Jl. Kebon Kacang bulat',
    })
})

describe("Crowdfunding Test", () => {
    it("should return All data Crowdfunding", async () => {
        const res = await request(app).get("/crowdFund").expect(200);
        expect(res.body).toStrictEqual(expect.any(Array));
        expect(res.body[0].id).toBe(1);
        expect(res.body[0].productName).toBe("Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots");
        expect(res.body[0].UserId).toBe(1);
        expect(res.body[0].targetQuantity).toBe(200);
        expect(res.body[0].initialProductPrice).toBe(100000);
        expect(res.body[0].finalProductPrice).toBe(125000);
        expect(res.body[0].manufactureName).toBe('Dongyang Huanyao Industry And Trade Co');
        expect(res.body[0].linkProduct).toBe('https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6');
        expect(res.body[0].status).toBe("Open");
        expect(res.body[0].currentQuantity).toBe(170);
        expect(res.body[0].startDate).toBe("2022-06-19T16:14:16.940Z");
        expect(res.body[0].productImage).toBe("https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg");
        expect(res.body[0].initialQuantity).toBe(100);
        expect(res.body[0].expiredDay).toBe(10);
        expect(res.body[0].hscode).toBe("62111100");
        expect(res.body[0].CrowdFundingProducts).toStrictEqual(expect.any(Array));
        expect(res.body[0].User).toStrictEqual(expect.any(Object));
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
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe('Balance is not enough');
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
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe('Balance is not enough');
    });

    it("should return Balance is not enough", async () => {
        const res = await request(app).post("/crowdFund/add")
            .set("access_token", access_token1)
            .send({
                productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
                initialProductPrice: 100000,
                initialQuantity: 2000,
                manufactureName: "Dongyang Huanyao Industry And Trade Co",
                linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6"
            })
            .expect(400);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe('Balance is not enough');
    });


    it("should return CrowdFunding created", async () => {
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
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe('CrowdFunding created');
        expect(res.body.data.targetQuantity).toBe(null);
        expect(res.body.data.finalProductPrice).toBe(null);
        expect(res.body.data.currentQuantity).toBe(null);
        expect(res.body.data.startDate).toBe(null);
        expect(res.body.data.productImage).toBe(null);
        expect(res.body.data.expiredDay).toBe(null);
        expect(res.body.data.hscode).toBe(null);
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
        expect(res.body.message).toBe("Crowd Funding success to open");
    });

    it("should return Error authentication, must login first", async () => {
        const res = await request(app).patch(`/crowdFund/approve/${1}`)
            .expect(401);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe("Error authentication, must login first");
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
                hscode: "656534",
                expiredDay: 10
            })
            .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe("Crowd Funding verified, waiting approval from User");
        expect(res.body.data).toStrictEqual(expect.any(Object));
    });
    it("should return Internal Server Error From Verified Endpoint", async () => {
        const res = await request(app).patch(`/crowdFund/verif/${1}`)
            .set("access_token", access_token)
            .expect(500);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.message).toBe("Internal Server Error");
    });
    it("should return Success Join Crowdfunding", async () => {
        const res = await request(app).post(`/crowdFund/join/${1}`)
        .set("access_token", access_token)
        .send({quantityToBuy : 10 , totalPrice : 10000 })
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success join crowdfunding");
    });
    it("should return data detail by id", async () => {
        const res = await request(app).get(`/crowdFund/detail/${1}`)
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));;
        expect(res.body.id).toBe(1);
        expect(res.body.productName).toBe("Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots");
        expect(res.body.UserId).toBe(1);
        expect(res.body.targetQuantity).toBe(100);
        expect(res.body.finalProductPrice).toBe(137000);
        expect(res.body.manufactureName).toBe('Dongyang Huanyao Industry And Trade Co');
        expect(res.body.linkProduct).toBe('https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6');
        expect(res.body.status).toBe("Pending");
        expect(res.body.currentQuantity).toBe(30);
        expect(res.body.startDate).toBe("2022-06-19T16:14:16.940Z");
        expect(res.body.productImage).toBe("https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg");
        expect(res.body.expiredDay).toBe(10);
        expect(res.body.hscode).toBe("656534");
    });

    it("should return All data From CrowdFunding", async () => {
        const res = await request(app).get(`/crowdFund/admin?status=Open`)
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Array));;
    });
    it("should return success deny crowdfunding", async () => {
        const res = await request(app).patch(`/crowdFund/deny/${1}`)
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("success deny crowdfunding");
    });

    it("should return all data history join login user", async () => {
        const res = await request(app).get(`/crowdFund/all-history-by-user-join`)
        .set("access_token", access_token)
        .expect(200);
        expect(res.body).toStrictEqual(expect.any(Array));
        expect(res.body[0]).toStrictEqual(expect.any(Object));
        expect(res.body[0].CrowdFunding).toStrictEqual(expect.any(Object));
        expect(res.body[0].User).toStrictEqual(expect.any(Object));
    });
    it("should return all data history join login user", async () => {
        const res = await request(app).get(`/crowdFund/all-history-by-user-join`)
        .expect(401);
        expect(res.body).toStrictEqual(expect.any(Object));
        expect(res.body.message).toBe("Error authentication, must login first");
    });

    it("should return Successfully refund balance to each user", async () => {
<<<<<<< HEAD
        const res = await request(app).get(`/balance/refund/${1}`)
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
=======
        const res = await request(app).get(`/balance/refund/1`)
        .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        console.log(res.body);
>>>>>>> 39b94051268a102affa1d52757bb99a760dd8e7a
        expect(res.body.message).toEqual("Successfully refund balance to each user");
    });

    it('Should handle error when hit findOne', async () => {
        jest.spyOn(CrowdFunding, 'findOne').mockRejectedValue('Internal Server Error')
        jest.spyOn(Balance, 'findAll').mockRejectedValue('Internal Server Error')
        jest.spyOn(Balance, 'update').mockRejectedValue('Internal Server Error')
        return request(app)
          .get(`/balance/refund/1`)
          .then((res) => {
            expect(res.status).toBe(500)
            expect(res.body).toBe('Internal Server Error')
          })
          .catch((err) => {
            console.log(err)
          })
      })
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
    await CrowdFundingProduct.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

