const Sauce = require("../models/sauce");
const fs = require("fs");

const sauceListHandler = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

const sauceHandler = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

const newSauceHandler = (req, res) => {
  const reqBody = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...reqBody,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const sauceUpdateHandler = (req, res) => {
  var sauce;
  if (req.body.sauce) {
    const reqSauce = JSON.parse(req.body.sauce);
    sauce = {
      ...reqSauce,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  } else {
    sauce = req.body;
  }
  delete sauce.userId;
  Sauce.findOne({ _id: req.params.id })
    .then((data) => {
      if (data.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauce, _id: req.params.id, userId: req.auth.userId }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const sauceDeleteHandler = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((data) => {
      if (data.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = data.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const sauceLikeHandler = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((data) => {
      var totalLikes = data.likes;
      var totalDislikes = data.dislikes;
      var likeArray = data.usersLiked;
      var dislikeArray = data.usersDisliked;
      if (likeArray.find((userId) => userId == req.auth.userId)) {
        const index = likeArray.find((userId) => userId == req.auth.userId);
        likeArray.splice(index, 1);
        totalLikes -= 1;
      }
      if (dislikeArray.find((userId) => userId == req.auth.userId)) {
        const index = likeArray.find((userId) => userId == req.auth.userId);
        dislikeArray.splice(index, 1);
        totalDislikes -= 1;
      }
      switch (req.body.like) {
        case 1:
          likeArray.push(req.auth.userId);
          totalLikes += 1;
          break;
        case -1:
          dislikeArray.push(req.auth.userId);
          totalDislikes += 1;
          break;
      }
      Sauce.updateOne(
        { _id: req.params.id },
        {
          likes: totalLikes,
          dislikes: totalDislikes,
          usersLiked: likeArray,
          usersDisliked: dislikeArray,
        }
      ).then(() => res.status(200).json({ message: "Objet modifié!" }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = {
  sauceListHandler,
  sauceHandler,
  newSauceHandler,
  sauceUpdateHandler,
  sauceDeleteHandler,
  sauceLikeHandler,
};
