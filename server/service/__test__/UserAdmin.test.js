const request = require('supertest');
const app = require("../app")
const { Admin } = require('../models/index');

const userAdmin = {
    username: "Jonna",
    email: "jon@email.com",
    password: "123456",
    phoneNumber: "0888888888",
    address: "Bandung",
};

describe("User Admin Test", () => {
    it("should return successfully created new User", async () => {
        const res = await request(app).post("/user/admin/register").send(userAdmin).expect(201);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.id).toBe(1);
        expect(res.body.username).toBe("Jonna");
        expect(res.body.email).toBe("jon@email.com");
        expect(res.body.phoneNumber).toBe("0888888888");
        expect(res.body.address).toBe("Bandung");
        expect(res.body.message).toEqual("Admin created successfully");
    });

    it("should return email already exist when created new Admin with same email", async () => {
        const res = await request(app).post("/user/admin/register").send(
            {
                username: "Jonna",
                email: "jon@email.com",
                password: "123456",
                phoneNumber: "0888888888",
                address: "Bandung",
            }
        ).expect(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toEqual("Email has been registered");
    });

    it("should return accesstoken when logged in", async () => {
        const res = await request(app)
          .post("/user/admin/login")
          .send({ email: "jon@email.com", password: "123456" })
          .expect(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.access_token).toEqual(expect.any(String));
      });
    
      it("should return error when invalid email", async () => {
        const res = await request(app)
          .post("/user/admin/login")
          .send({ email: "sawadikap@gmail.com", password: "123456" })
          .expect(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Email or Password Wrong");
      });
    
      it("should return error when invalid password", async () => {
        const res = await request(app)
          .post("/user/admin/login")
          .send({ email: "jon@email.com", password: "sawadikap" })
          .expect(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Email or Password Wrong");
      });
})

afterAll(async () => {
    await Admin.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})



