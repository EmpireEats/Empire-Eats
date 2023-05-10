const http = require('http');
const { Server } = require('socket.io');

//* kim added
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const { Post } = require('./db/index');

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
    io.emit('message', message);
    console.log('Server emitted message:', message);
  });

  socket.on('newPost', async (post) => {
    console.log('Received new post from client:', post);

    try {
      const existingPost = await Post.findOne({
        where: { userId: post.userId },
      });

      if (existingPost) {
        console.log(`User ${post.userId} already has a post.`);
        socket.emit('postError', 'User can only have one post at a time.');
      } else {
        const newPost = await Post.create({
          text: post.text,
          preference: post.preferences,
          isActive: true,
          userId: post.userId,
        });

        console.log('Created new post in database:', newPost);
        io.emit('newPost', newPost);
      }
    } catch (error) {
      console.error('error adding post', error);
    }
  });

  socket.on('deletePost', async (postId) => {
    console.log('Received deletePost event for postId:', postId);

    try {
      const deletedPost = await Post.destroy({ where: { id: postId } });

      if (deletedPost) {
        console.log('Deleted post in database:', postId);
        io.emit('deletePost', postId);
      } else {
        console.error('Post not found:', postId);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
