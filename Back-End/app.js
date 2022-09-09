const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Client = require("./models/client");

const app = express();
const saltRounds = 10;

mongoose
  .connect(
    "mongodb+srv://Isilud:sIAAP5sHKomAWimC@clusterjh.nkndw5r.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/auth/signup", (req, res, next) => {
  delete req.body._id;
  const client = new Client({
    ...req.body,
  });
  bcrypt.hash(client.password, saltRounds, function (err, hash) {
    client.password = hash;
    client
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  });
});

app.post("/api/auth/login", (req, res, next) => {
  const client = new Client({
    ...req.body,
  });
  Client.findOne({ email: client.email })
    .then((data) => {
      bcrypt.compare(client.password, data.password, function (err, result) {
        console.log(result);
        if (result) {
          res.status(200).json({ userId: client.email, token: "niceToken" });
        } else {
          res.status(400).json(Error("Mauvais mot de passe."));
        }
      });
    })
    .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
