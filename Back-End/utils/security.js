const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const key = "G8MwkX7^D[vy1qp";

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
.is().min(6)        
.is().max(20)       
.has().uppercase(1)   
.has().lowercase(1)   
.has().digits(1)     
.has().not().spaces()

const checkPassword = (string) => {
  return schema.validate(string);
}

const crypt = async (toHash) => {
  return bcrypt.hash(toHash, saltRounds).then((hash) => {
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

module.exports = { crypt, decrypt, newToken, decodeToken, checkPassword };
