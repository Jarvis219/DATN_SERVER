import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { notification } from './controllers/socket';
import { scheduleJob, RecurrenceRule, Range } from 'node-schedule-tz';
import { handleUpdateWorkdayHistory } from './controllers/handleUpdateWorkdayHistory';
const { instrument } = require('@socket.io/admin-ui');

const app = express();
dotenv.config();

const rule = new RecurrenceRule();
rule.dayOfWeek = [0, new Range(0, 6)];
rule.hour = 9;
rule.minute = 45;
rule.tz = 'Asia/Ho_Chi_Minh';
scheduleJob(rule, function () {
  console.log('running');
  handleUpdateWorkdayHistory();
});

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
const staffRouter = require('./routes/staff');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const salaryRouter = require('./routes/salary');
const userRouter = require('./routes/user');
const appointmentRouter = require('./routes/appointment');
const customerRouter = require('./routes/customer');
const cartRouter = require('./routes/cart');
const invoiceRouter = require('./routes/invoice');
const detailInvoiceRouter = require('./routes/detailInvoice');
const employeeJobDetail = require('./routes/employeeJobDetail');
const contactRouter = require('./routes/contact');
const workdayHistoryRouter = require('./routes/workdayHistory');
const orderRouter = require('./routes/order');
const brandRouter = require('./routes/brand');
const treatmentRouter = require('./routes/treatment');
const evaluateRouter = require('./routes/evaluate');
const treatmentDetailRouter = require('./routes/appointmentTreatment');
const blogRouter = require('./routes/blog');
const appointmentTreatmentDetail = require('./routes/appointmentTreatmentDetail');

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

notification(io);

app.use('/api', authRouters);
app.use('/api', serviceRouter);
app.use('/api', staffRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', salaryRouter);
app.use('/api', userRouter);
app.use('/api', cartRouter);
app.use('/api', contactRouter);
app.use('/api', workdayHistoryRouter);
app.use('/api', orderRouter);
app.use('/api', brandRouter);
app.use('/api', evaluateRouter);
// api đặt lịch
app.use('/api', appointmentRouter);
app.use('/api', customerRouter);
app.use('/api', invoiceRouter);
app.use('/api', detailInvoiceRouter);
app.use('/api', employeeJobDetail);
app.use('/api', treatmentRouter);
app.use('/api', treatmentDetailRouter);
app.use('/api', blogRouter);
app.use('/api', appointmentTreatmentDetail);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
