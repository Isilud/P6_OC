const {
  crypt,
  decrypt,
  newToken,
  checkPassword,
} = require("../utils/security");

const Client = require("../models/client");

const signupHandler = async (req, res) => {
  delete req.body._id;
  const client = new Client({
    ...req.body,
  });
  if (!checkPassword(client.password)) {
    let error = new Error(
      "Le mot de passe doit avoir une majuscule, une minuscule, un chiffre et ne doit pas contenir d'espace."
    );
    res.status(400).json({ error: error.message });
    return;
  }
  const hash = await crypt(client.password);
  client.password = hash;
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
    res.status(200).json({
      userId: data._id,
      token: newToken(data._id),
    });
  } else {
    const error = Error("Mauvais mot de passe.");
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupHandler, loginHandler };
