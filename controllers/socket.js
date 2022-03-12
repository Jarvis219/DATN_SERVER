// import EmployeeJobDetail from '../models/employeeJobDetailModel';
// import {
//   createNotificationStaff,
//   listNotificationStaff,
// } from './notificationStaffController';

// function employeeJobDetail(id) {
//   return new Promise((resolve, reject) => {
//     EmployeeJobDetail.find({ _id: id })
//       .populate([
//         { path: 'service_id' },
//         { path: 'staff_id', populate: { path: 'user_id' } },
//       ])
//       .exec((err, data) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(data);
//       });
//   });
// }

export const notification = (io) => {
  // io.on('connection', (socket) => {
  //   socket.on('disconnect', () => {});
  //   socket.on('notifications', (data) => {
  //     employeeJobDetail(data).then((noti) => {
  //       socket.emit('send-message', noti);
  //     });
  //   });
  //   socket.on('notifications-staff', (id) => {
  //     createNotificationStaff(id).then((data) => {
  //       listNotificationStaff(data.staff_id).then((noti) => {
  //         socket.broadcast.emit('send-message', noti);
  //       });
  //     });
  //   });
  // });
};

// export const message = (io) => {
//   io.on('connection', (socket) => {
//     socket.on('disconnect', () => {
//       // console.log("disconnect");
//     });
//     socket.on('test', (data) => {
//       socket.emit('test1', 'mess');
//     });
//     socket.on('send-message', (room, data) => {
//       if (room === '') {
//         socket.broadcast.emit('private-message', data);
//       } else {
//         console.log(room, data);
//         socket.in(room).emit('private-message', data);
//       }
//     });

//     socket.on('join-room', (room) => {
//       socket.join(room);
//     });
//   });
// };
