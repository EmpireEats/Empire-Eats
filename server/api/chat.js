const router = require("express").Router();

let messages = [];

router.post("/api/chat/messages", async (req, res, next) => {
    console.log("POST /messages")
  try {
    const message = req.body;
    console.log('Message received:', message);

    if (!message.text || typeof message.text !== "string") {
      return res.status(400).json({ error: "Invalid message format." });
    }

    messages.push({ sender: "you", text: message.text });
    messages.push({ sender: "other", text: `Received: ${message.text}` });

    res.json(messages);
  } catch (error) {
    console.error("Error sending message:", error);
    next(error);
  }
});

module.exports = router;
