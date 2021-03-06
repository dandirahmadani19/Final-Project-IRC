const request = require('supertest');
const app = require("../app")
const { User } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");
const authentication = require("../middlewares/Authentication");

const userData = {
  firstName: "Jonna",
  lastName: "Sawadikap",
  email: "jon@email.com",
  password: "123456",
  phoneNumber: "0888888888",
  address: "Bandung",
};

let access_token;
let access_token1;
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
  access_token1 = tokenMakerFromPayload({
    id : 10,
    firstName: 'Johnnn',
    email : "sawdidap@mail.com",
    lastName: 'Doenn',
    phoneNumber: '081234567890',
    address: 'Jl. Kebon Kacang',
  })
  access_token2 = tokenMakerFromPayload({
    id : 100,
    firstName: 'Johnnn',
    email : "sawdidddssaaap@mail.com",
    lastName: 'Doenn',
    phoneNumber: '081234567890',
    address: 'Jl. Kebon Kacang',
  })
})

describe("User Client Test", () => {
  it("should return all data User", async () => {
    const res = await request(app).get("/user").expect(200);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0].firstName).toBe("John");
    expect(res.body[0].lastName).toBe("Doe");
    expect(res.body[0].email).toBe("jhon@mail.com");
    expect(res.body[0].phoneNumber).toBe("081234567890");
    expect(res.body[0].address).toBe("Jl. Kebon Kacang");
  });

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



describe("should return data user after login", () => {
  it("Get data User after Login", async () => {
   const res = await request(app)
      .get("/user/user-login")
      .set("access_token", access_token).expect(200)
      expect(res.body).toEqual(expect.any(Object));
  })
})

describe("Auth Test", () => {
  it("should return Error authentication, must login first", async () => {
    const res = await request(app).get("/user/user-login").expect(401);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Error authentication, must login first`);
  });

  it("should return invalid Error authentication, must login first", async () => {
    const res = await request(app)
      .get("/user/user-login")
      .send(
        "access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiSm9zdWEiLCJsYXN0TmFtZSI6IldpbGxpYW0iLCJlbWFpbCI6Impvc3VhQG1haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODEyMzQ1Njc4OTAiLCJhZGRyZXNzIjoiSmwuIEtlYm9uIEthY2FuZyIsImlhdCI6MTY1NTg3NDQyN30.Aoj8Dk3ePNQV_UrwomqkaMU6TDtCYmDD_sBykxy6R7g"
      )
      .expect(401);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Error authentication, must login first`);
  });
  
})


afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
})
