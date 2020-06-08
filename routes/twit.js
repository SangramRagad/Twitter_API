const express = require("express");
const { protect } = require("../middleware/auth");

const { getTweets, getUser } = require("../controllers/getTwitterData");

const router = express.Router();

router.get("/twitter/search/tweets", protect, getTweets);
router.get("/twitter/users/show", getUser);

module.exports = router;
