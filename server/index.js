const http = require('http');
const { Server } = require('socket.io');

//* kim added
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const { Post, UserInteraction, User } = require('./db/index');

//* kim added
const leaderboardRoutes = require('./api/leaderboard');

//* kim added
const feedRouter = require('./api/feed');
dotenv.config();

const port = process.env.PORT || 3000;
const app = require('./app');

//* kim added. Adding the leaderboard and feed routes to the Express app
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/feed', feedRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket.io connection handler
io.on('connection', (socket) => {
  socket.on('message', ({ sender, text, postId }) => {
    io.emit('message', { sender, text, postId });
  });

  socket.on('newPost', async (post) => {
    try {
      const existingPost = await Post.findOne({
        where: { userId: post.userId },
      });

      if (existingPost) {
        io.to(socket.id).emit(
          'postError',
          'User can only have one post at a time.'
        );
      } else {
        const newPost = await Post.create({
          message: post.message,
          preference: post.preferences,
          isActive: true,
          userId: post.userId,
          latitude: post.latitude,
          longitude: post.longitude,
        });
        const createdPostWithUser = await Post.findOne({
          where: { id: newPost.id },
          include: [User],
        });
        io.emit('newPost', createdPostWithUser);
      }
    } catch (error) {
      console.error('error adding post', error);
    }
  });

  socket.on('updatePost', async (post) => {
    try {
      const updatedPost = await Post.findOne({
        where: { id: post.id },
        include: [User],
      });

      if (!updatedPost) {
        return;
      }

      for (let key in post) {
        updatedPost[key] = post[key];
      }

      await updatedPost.save();
      io.emit('updatePost', updatedPost);
    } catch (error) {
      socket.emit('postError', 'Error updating post.');
    }
  });

  socket.on('deletePost', async (postId) => {
    try {
      const deletedPost = await Post.destroy({ where: { id: postId } });

      if (deletedPost) {
        io.emit('deletePost', postId);
      } else {
        console.error('Post not found:', postId);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  });

  socket.on(
    'createUserInteraction',
    async ({ postId, postAuthorId, loggedInUserId }) => {
      try {
        const post = await Post.findByPk(postId);
        const existingInteraction = await UserInteraction.findOne({
          where: { postId: postId },
        });

        const interactionExists =
          existingInteraction ||
          (await UserInteraction.findOne({
            where: { interactingUserId: loggedInUserId },
          }));

        if (interactionExists && post.preference === 'one on one') {
          return io
            .to(socket.id)
            .emit(
              'userInteractionError',
              'user interaction already active for this post'
            );
        }

        const interactionData = {
          postId,
          postAuthorId,
          interactingUserId: loggedInUserId,
          isActive: true,
        };

        if (interactionExists) {
          await interactionExists.update(interactionData);
        } else {
          await UserInteraction.create(interactionData);
        }

        io.to(socket.id).emit('userInteractionCreated', interactionData);
      } catch (error) {
        console.error('Error creating user interaction:', error);
        io.to(socket.id).emit(
          'userInteractionError',
          'Error creating user interaction'
        );
      }
    }
  );

  socket.on('removeUserInteraction', async ({ postId, userId }) => {
    try {
      const userInteraction = await UserInteraction.findOne({
        where: { postId, interactingUserId: userId },
      });

      if (userInteraction) {
        await userInteraction.destroy();
        io.to(socket.id).emit('userInteractionDeleted', userInteraction);
      } else {
        console.error('Cannot find interaction');
      }
    } catch (error) {
      console.error("Error deleting user's interaction with post:", error);
      io.to(socket.id).emit(
        'userInteractionError',
        'Error deleting user interaction'
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
