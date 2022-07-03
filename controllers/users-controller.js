const { Users } = require("../models");

const userCtrler = {
  createNewUser({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  showAllUsers(req, res) {
    Users.find({})
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  showSingleUser({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Sorry! No User found with this ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  modifyUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Sorry! No User found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  removeUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Sorry! No User found with this ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addNewFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Sorry! No User found with this ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Sorry! No User found with this ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userCtrler;
