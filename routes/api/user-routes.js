const router = require("express").Router();

const {
  showAllUsers,
  showSingleUser,
  createNewUser,
  modifyUser,
  removeUser,
  addNewFriend,
  removeFriend,
} = require("../../controllers/users-controller");

router.route("/").get(showAllUsers).post(createNewUser); // <GET, POST>

router.route("/:id").get(showSingleUser).put(modifyUser).delete(removeUser); // <GET, PUT, DELETE>

router.route("/:id/friends/:friendId").post(addNewFriend).delete(removeFriend); //<POST, DELETE>

module.exports = router;
