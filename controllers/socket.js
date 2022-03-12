import NotificationStaff from '../models/NotificationStaffModel';
import _ from 'lodash';

const listNotificationStaff = (staffId) => {
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(staffId);
  return new Promise((resolve, reject) => {
    NotificationStaff.find({ staff_id: id })
      .populate([{ path: 'staff_id' }, { path: 'appointments_id' }])
      .exec((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
  });
};

const createNotificationStaff = (data) => {
  const notificationStaff = new NotificationStaff(data);
  return new Promise((resolve, reject) => {
    notificationStaff.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const removeNotificationStaff = (idNoti) => {
  return new Promise((resolve, reject) => {
    NotificationStaff.find({ _id: idNoti })
      .remove()
      .exec((err, data) => {
        if (err) {
          reject(err);
        }
        resolve('remove success');
      });
  });
};

export const notification = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {});

    socket.on('notifications-staff', (id) => {
      createNotificationStaff(id).then((data) => {
        listNotificationStaff(data.staff_id).then((noti) => {
          socket.broadcast.emit('send-message', noti);
        });
      });
    });
  });
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
