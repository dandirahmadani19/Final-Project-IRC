const { payloadReaderFromToken } = require("../helpers/helperJwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // console.log('line 9 <==========');
    const { access_token } = req.headers;
    const payload = payloadReaderFromToken(access_token);

    const findTheUser = await User.findByPk(payload.id);
    if (!findTheUser) {
      throw { name: "Unauthorized" };
    } else {
      req.loginfo = {
        id: findTheUser.id,
        username: findTheUser.firstName,
        email: findTheUser.email,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
