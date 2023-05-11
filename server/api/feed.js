const express = require("express");
const router = express.Router();
const { getFeed } = require("../db/models/Feed");

router.get("/", async (req, res, next) => {
  try {
    const feed = await getFeed();
    console.log("Feed data: ", feed); 
    res.json(feed);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
