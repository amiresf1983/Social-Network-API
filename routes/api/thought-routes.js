const router = require("express").Router();

const {
  showAllThoughts,
  showSingleThought,
  postNewTought,
  modifyThoughts,
  removeThoughts,
  postReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(showAllThoughts);

router
  .route("/:id")
  .get(showSingleThought)
  .put(modifyThoughts)
  .delete(removeThoughts);

router.route("/:userId").post(postNewTought);

router.route("/:thoughtId/reactions").post(postReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
