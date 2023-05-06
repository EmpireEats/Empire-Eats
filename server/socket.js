const http = require("http");
const socketIO = require("socket.io");

const app = require("express")();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log("Message received:", message);
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = server;
