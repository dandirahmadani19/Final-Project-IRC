const { Balance } = require('../models')
const app = require('../app')
const request = require('supertest')
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");

beforeEach(() => {
    jest.restoreAllMocks()
})

describe("Balance End Point Test", () => {
    it('Should handle error when hit findAll', async () => {
        jest.spyOn(Balance, 'findAll').mockRejectedValue('error')
        return request(app)
          .get('/balance')
          .then((res) => {
            expect(res.status).toBe(500)
            console.log(req.body, "<<<<<<<<<<<<<<<<< INI WOYYY");
          })
          .catch((err) => {
            console.log(err)
          })
      })
})
