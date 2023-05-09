const http = require('http');
const { Server } = require('socket.io');

//* kim added
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

//* kim added
const leaderboardRoutes = require('./api/leaderboard');

//* kim added
const feedRoutes = require('./api/feed');
dotenv.config();

const port = process.env.PORT || 3000;
const app = require('./app');

//* kim added. Adding the leaderboard and feed routes to the Express app
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/feed', feedRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Broadcast the received message to all connected clients, including the sender
    io.emit('message', message);
    console.log('Server emitted message:', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));


