const express = require('express');
const configViewEngine = require('./config/ViewEngine');
const cors = require('cors');
require('dotenv').config();
const connection = require('./config/database');
const { routerApi, ApiNodejs } = require('./routes/routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const socketHandler = require('./socket/socket');
const doLoginWGoogle = require('./controller/social/GoogleController');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./routes/tutorRoutes');
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || 'localhost';

// Tạo server chỉ khi không phải Vercel
let server;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  server = http.createServer(app);
}

// Tạo Socket.IO chỉ khi có server
let io;
if (server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'https://learnmate-rust.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }
  });
}
// Configure request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session()); // Enable passport session support

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://learnmate-rust.vercel.app',
  credentials: true,
}));

// Use your view engine configuration if rendering views
configViewEngine(app);

app.use('/', routerApi);
app.use('/api/tutor', router);

app.get("/", (req, res) => {
  res.json({
    message: "LearnMate API is running!",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

// Khởi tạo Socket.IO handler nếu có
if (io) {
  socketHandler(io);
}

// Khởi tạo ứng dụng
(async () => {
  try {
    await connection();
    doLoginWGoogle();
    
    // Chỉ start server khi không phải Vercel
    if (server) {
      server.listen(port, () => {
        console.log(`Backend + Socket listening on port ${port}`);
      });
    } else {
      console.log('Running on Vercel - serverless mode');
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// Export app cho Vercel
module.exports = app;
