const bcrypt = require("bcrypt");
const saltRounds = 10;

const crypt = async (password) => {
  return bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });
};

const decrypt = (hash, test) => {
  return bcrypt.compare(hash, test).then((result) => {
    return result;
  });
};

module.exports = { crypt, decrypt };
