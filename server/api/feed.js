const express = require("express");
const router = express.Router();
const { getFeed } = require("../db/models/Feed");

router.get("/", async (req, res, next) => {
  try {
    const feed = await getFeed();
    // console.log("Feed data: ", feed); //! DELETE THIS LINE but not till the 5/19
    res.json(feed);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
