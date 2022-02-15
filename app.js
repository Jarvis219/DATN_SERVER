import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import { message } from './controllers/socket';
// const { instrument } = require('@socket.io/admin-ui');

const app = express();
dotenv.config();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Request-Method',
//     'GET, PUT, POST, DELETE, OPTIONS'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization, Application-json'
//   );
//   next();
// });

// server with socket
// const server = require('http').Server(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   },
// });
// instrument(io, {
//   auth: false,
// });

// Router
const authRouters = require('./routes/auth');

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: 'same-origin',
  })
);

// message(io);

app.use('/api', authRouters);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
