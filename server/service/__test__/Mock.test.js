const { Balance, User, CrowdFunding, CrowdFundingProduct } = require('../models')
const app = require('../app')
const request = require('supertest')
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
            amount: 1000000,
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
    await CrowdFundingProduct.bulkCreate([
        {
            CrowdFundingId: 1,
            UserId: 2,
            quantityToBuy : 10,
            totalPrice : 40000,
            paymentStatus : "Paid",
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

describe("Balance End Point Test", () => {
    it('Should handle error when hit findAll', async () => {
        jest.spyOn(Balance, 'findAll').mockRejectedValue('Internal Server Error')
        return request(app)
            .get('/balance')
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body).toBe('Internal Server Error')
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit findOne', async () => {
        jest.spyOn(Balance, 'findOne').mockRejectedValue('Internal Server Error')
        return request(app)
            .get(`/balance/check-balance/${1000000}`)
            .set("access_token", access_token)
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body).toBe('Internal Server Error')
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit Create Crowd Funding', async () => {
        jest.spyOn(Balance, 'findOne').mockRejectedValue('error')
        return request(app)
            .post(`/crowdFund/add`)
            .set("access_token", access_token)
            .send({
                productName: "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
                initialProductPrice: 100000,
                initialQuantity: 20,
                manufactureName: "Dongyang Huanyao Industry And Trade Co",
                linkProduct: "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6"
            })
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.error).tobe("error")
            })
            .catch((err) => {
                console.log(err)
            })
    })

})

describe("Crowd Funding End Point Test", () => {
    it('Should handle error when hit findOne', async () => {
        jest.spyOn(CrowdFunding, 'findAll').mockRejectedValue('Internal Server Error')
        return request(app)
            .get("/crowdFund/admin")
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
            })
            .catch((err) => {
                console.log(err)
            })
    })

    it('Should handle error when hit findOne', async () => {
        jest.spyOn(CrowdFunding, 'findOne').mockRejectedValue('Internal Server Error')
        return request(app)
            .patch("/crowdFund/approve/1")
            .set("access_token", access_token)
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit findOne', async () => {
        jest.spyOn(CrowdFundingProduct, 'findOne').mockRejectedValue('Internal Server Error')
        return request(app)
            .post("/crowdFund/join/1")
            .set("access_token", access_token)
            .send({quantityToBuy : 10 , totalPrice : 10000 })
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit findAll', async () => {
        jest.spyOn(CrowdFundingProduct, 'findAll').mockRejectedValue('Internal Server Error')
        return request(app)
            .get("/crowdFund/all-history-by-user-join")
            .set("access_token", access_token)
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit findAll', async () => {
        jest.spyOn(CrowdFunding, 'findAll').mockRejectedValue('Internal Server Error')
        return request(app)
            .get("/crowdFund/all-history-by-user-submit")
            .set("access_token", access_token)
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
            })
            .catch((err) => {
                console.log(err)
            })
    })
    it('Should handle error when hit update', async () => {
        jest.spyOn(CrowdFunding, 'update').mockRejectedValue('Internal Server Error')
        return request(app)
            .patch("/crowdFund/deny/1")
            .then((res) => {
                expect(res.status).toBe(500)
                expect(res.body.message).toBe('Internal Server Error')  
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
