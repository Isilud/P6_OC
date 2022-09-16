const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const key = "G8MwkX7^D[vy1qp";

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

const newToken = (id) => {
  return jwt.sign({ userId: id }, key, {
    expiresIn: "24h",
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, key);
}

module.exports = { crypt, decrypt, newToken, decodeToken };
