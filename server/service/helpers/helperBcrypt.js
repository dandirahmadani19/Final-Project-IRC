const bcrypt = require('bcryptjs');

function passwordEncryptor(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassowrd(inputedPassword, databaseStoredPassword) {
  return bcrypt.compareSync(inputedPassword, databaseStoredPassword);
}

module.exports = { passwordEncryptor, comparePassowrd };
