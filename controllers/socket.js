import EmployeeJobDetail from "../models/employeeJobDetailModel";

function employeeJobDetail() {
  return new Promise((resolve, reject) => {
    EmployeeJobDetail.find()
      .populate([
        { path: "service_id" },
        { path: "staff_id", populate: { path: "user_id" } },
      ])
      .exec((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
  });
}

export const notification = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      // console.log("disconnect");
    });
    employeeJobDetail().then((data) => {
      socket.emit("send-message", data);
    });

    socket.on("notifications", (data) => {
      console.log(data);
      socket.emit("send-notifications", "listStaff()");
    });
  });
};

export const message = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      // console.log("disconnect");
    });
    socket.on("test", (data) => {
      socket.emit("test1", "mess");
    });
    socket.on("send-message", (room, data) => {
      if (room === "") {
        socket.broadcast.emit("private-message", data);
      } else {
        console.log(room, data);
        socket.in(room).emit("private-message", data);
      }
    });

    socket.on("join-room", (room) => {
      socket.join(room);
    });
  });
};
