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
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});
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
  origin: 'https://learnmate-rust.vercel.app',
  credentials: true,
}));

// Use your view engine configuration if rendering views
configViewEngine(app);

app.use('/', routerApi);
app.use('/api/tutor', router);

app.get("/", (req, res) => {
  res.json("Hello");
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
socketHandler(io);
(async () => {
  try {
    await connection();
    doLoginWGoogle();
    server.listen(port, () => {
      console.log(`Backend + Socket listening on port ${port}`);
    });


  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
