const request = require('supertest');
const app = require("../app")
const { User } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");

const userData = {
  firstName: "Jonna",
  lastName: "Sawadikap",
  email: "jon@email.com",
  password: "123456",
  phoneNumber: "0888888888",
  address: "Bandung",
};


describe("User Client Test", () => {
  it("should return successfully created new User", async () => {
    const res = await request(app).post("/user/register").send(userData).expect(201);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.id).toBe(2);
    expect(res.body.firstName).toBe("Jonna");
    expect(res.body.lastName).toBe("Sawadikap");
    expect(res.body.email).toBe("jon@email.com");
    expect(res.body.phoneNumber).toBe("0888888888");
    expect(res.body.address).toBe("Bandung");
    expect(res.body.message).toEqual("User created successfully");
  });

  it("should return server error when created new User", async () => {
    const res = await request(app).post("/user/register").send(
      {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      }
    ).expect(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual(expect.any(String));
  });

  it("should return email already exist when created new User with same email", async () => {
    const res = await request(app).post("/user/register").send(
      {
        firstName: "Jonna",
        lastName: "Sawadikap",
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
      .post("/user/login")
      .send({ email: "jon@email.com", password: "123456" })
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.access_token).toEqual(expect.any(String));
  });

  it("should return error when invalid email", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ email: "sawadikap@gmail.com", password: "123456" })
      .expect(401);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("Email or Password Wrong");
  });

  it("should return error when invalid password", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ email: "jon@email.com", password: "sawadikap" })
      .expect(401);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("Email or Password Wrong");
  });
});

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

describe("should return data user after login", () => {
  it("Get data User after Login", () => {
   const res = request(app)
      .get("/user/user-login")
      .set("access_token", access_token)
      .expect(200)
  })
})

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
})
