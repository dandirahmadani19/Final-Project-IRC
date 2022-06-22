const errorsHandler = (err, req, res, next) => {
  let code, msg;
  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((e) => e.message).join(', ');
      break;
    case "EMAIL_ALREADY_EXIST":
      code = 400;
      msg = "Email has been registered";
      break;
    case "JsonWebTokenError":
      code = 401;
      msg = "Error authentication, must login first";
      break;
    case "USER_NOT_FOUND":
      code = 401;
      msg = "Email or Password Wrong";
      break;
    case "PASSWORD_NOT_MATCH":
      code = 401;
      msg = "Email or Password Wrong";
      break;
    case "ADMIN_NOT_FOUND" :
      code = 401;
      msg = "Email or Password Wrong";
      break;
    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorsHandler;
