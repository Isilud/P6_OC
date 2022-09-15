/* eslint-disable no-undef */
require("dotenv").config();

class Database {
  constructor() {
    this.user = process.env.MANGO_USER;
    this.password = process.env.MANGO_PWD;
  }

  connect = () => {
    const mongoose = require("mongoose");
    mongoose
      .connect(
        "mongodb+srv://" +
          this.user +
          ":" +
          this.password +
          "@clusterjh.nkndw5r.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));
  };
}

module.exports = Database;
