const Client = require("../models/client");
const { crypt, decrypt } = require("../utils/security");

const signupHandler = async (req, res) => {
  delete req.body._id;
  const client = new Client({
    ...req.body,
  });
  const hash = await crypt(client.password);
  client.password = hash;
  console.log(client);
  client
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

const loginHandler = async (req, res) => {
  const client = new Client({
    ...req.body,
  });
  const data = await Client.findOne({ email: client.email })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(404).json(error);
    });
  const success = await decrypt(client.password, data.password);
  if (success) {
    res.status(200).json({ userId: client.email, token: "niceToken" });
  } else {
    res.status(400).json(Error("Mauvais mot de passe."));
  }
};

module.exports = { signupHandler, loginHandler };
