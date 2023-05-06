const router = require('express').Router();
const Post = require('../db/models/Post');

let posts = []; // You can replace this with actual database calls later

router.post("/", async (req, res, next) => {
  console.log("Post POST route called");

  try {
    const post = req.body;
    console.log("Post received:", post);

    if (!post.text || typeof post.text !== "string") {
      return res.status(400).json({ error: "Invalid post format." });
    }

    // You can add more fields as needed
    const newPost = { text: post.text, sortingOptions: post.sortingOptions };

    // Save the post to the array (or database)
    posts.push(newPost);

    res.json(newPost);
  } catch (error) {
    console.error("Error posting:", error);
    next(error);
  }
});

module.exports = router
