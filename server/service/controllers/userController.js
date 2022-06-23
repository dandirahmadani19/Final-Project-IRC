const { tokenMakerFromPayload } = require("../helpers/helperJwt");
const { User, Admin, Balance } = require("../models");
const { comparePassowrd } = require("../helpers/helperBcrypt");

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      // next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber, address } =
        req.body;
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (findUser) {
        throw { name: "EMAIL_ALREADY_EXIST" };
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
      });
      await Balance.create({
        amount: 0,
        UserId: user.id,
      });
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
        include: {
          model: Balance,
          attributes: ["amount"],
        },
      });
      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }
      if (!comparePassowrd(password, user.password)) {
        throw { name: "PASSWORD_NOT_MATCH" };
      }
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      };
      const accesToken = tokenMakerFromPayload(payload);
      res.status(200).json({
        access_token: accesToken,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        Balance: user.Balance,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({
        where: {
          email,
        },
      });
      if (!admin) {
        throw { name: "ADMIN_NOT_FOUND" };
      }
      if (!comparePassowrd(password, admin.password)) {
        throw { name: "PASSWORD_NOT_MATCH" };
      }
      const payload = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        address: admin.address,
      };
      const accesToken = tokenMakerFromPayload(payload);
      res.status(200).json({
        access_token: accesToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const findAdmin = await Admin.findOne({
        where: {
          email: email,
        },
      });
      if (findAdmin) {
        throw { name: "EMAIL_ALREADY_EXIST" };
      }
      const admin = await Admin.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        address: admin.address,
        message: "Admin created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id, username, email } = req.loginfo;
      const user = await User.findOne({
        where: {
          id,
          email,
        },
        include: {
          model: Balance,
          attributes: {
            exclude: ["createdAt", "updatedAt", "UserId"],
          },
        },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(user);
    } catch (error) {
      // next(error);
    }
  }
}

module.exports = UserController;
