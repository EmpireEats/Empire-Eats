const http = require('http');
const { Server } = require('socket.io');

const dotenv = require('dotenv');
dotenv.config();
const { Post } = require('./db/index');

const port = process.env.PORT || 3000;
const app = require('./app');

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
      const newPost = await Post.create({
        text: post.text,
        preference: post.sortingOptions,
        isActive: true,
      });

      console.log('Created new post in database:', newPost);
      io.emit('newPost', newPost);
    } catch (error) {
      console.error('error adding post', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));


