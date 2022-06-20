const request = require('supertest');
const app = require("../app")
const { User, CrowdFunding, Balance } = require('../models/index');
const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { passwordEncryptor } = require("../helpers/helperBcrypt");