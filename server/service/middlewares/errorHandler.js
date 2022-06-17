const errorsHandler = (err, req, res, next) => {
  let code, msg;
  switch (err.name) {
    case 'SequelizeValidationError':
      code = 400;
      msg = err.errors.map((e) => e.message);
      break;
    case 'SequelizeUniqueConstraintError':
      code = 400;
      msg = 'Email has been registered';
      break;
    case "QTY_EXCEEDED":
      code = 400;
      msg = "QTY_EXCEEDED";
    break;
    case "JsonWebTokenError":
      code = 401;
      msg = 'Error authentication, must login first';
      break;
    default:
      code = 500;
      msg = 'Internal Server Error';
      break;
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorsHandler;
