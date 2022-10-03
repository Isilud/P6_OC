/* eslint-disable no-undef */
require("dotenv").config();

class Database {
  constructor() {
    this.url = process.env.MANGO_URL;
  }

  connect = () => {
    const mongoose = require("mongoose");
    mongoose
      .connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));
  };
}

module.exports = Database;
