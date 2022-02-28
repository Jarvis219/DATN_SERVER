import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { message } from './controllers/socket';
const { instrument } = require('@socket.io/admin-ui');

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
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
});
instrument(io, {
  auth: false,
});

// Router
const authRouters = require('./routes/auth');
const serviceRouter = require('./routes/service');
const positionRouter = require('./routes/position');
const staffRouter = require('./routes/staff');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const salaryRouter = require('./routes/salary');
const userRouter = require('./routes/user');
const appointmentRouter = require('./routes/appointment');
const customerRouter = require('./routes/customer');
const invoiceRouter = require('./routes/invoice');
const detailInvoiceRouter = require('./routes/detailInvoice');
const employeeJobDetail = require('./routes/employeeJobDetail');

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
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

message(io);

app.use('/api', authRouters);
app.use('/api', serviceRouter);
app.use('/api', positionRouter);
app.use('/api', staffRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', salaryRouter);
app.use('/api', userRouter);
// api đặt lịch
app.use('/api', appointmentRouter);
app.use('/api', customerRouter);
app.use('/api', invoiceRouter);
app.use('/api', detailInvoiceRouter);
app.use('/api', employeeJobDetail);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
