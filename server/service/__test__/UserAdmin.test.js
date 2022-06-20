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


  
