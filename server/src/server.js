const express = require("express");
const http = require("http");
const socket = require("socket.io");
const moment = require("moment");
const dotenv = require("dotenv");
const cors = require("cors");
const { user_join, user_leave, get_user } = require("./utilities/users_helper");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  return res.send("Chatroom server");
});

io.on("connection", (socket) => {
  // on new user joins room
  socket.on("join_room", ({ username, room }) => {
    // create user
    const user = user_join(socket.id, username, room);
    socket.join(user.room);

    // welcome message to user
    socket.emit("general_message", {
      username: "ChatHouse",
      time: moment().format("h:mm a"),
      text: `Hi ${user.username} Welcome to ${user.room}`,
    });

    // message to other users about the new user join
    socket.broadcast.to(user.room).emit("general_message", {
      username: "ChatHouse",
      time: moment().format("h:mm a"),
      text: `${user.username} has joined`,
    });
  });

  // on someone messaging
  socket.on("message", (text) => {
    // find the room
    const user = get_user(socket.id)[0];

    // send message to all users in room
    io.to(user.room).emit("message", {
      username: user.username,
      time: moment().format("h:mm a"),
      text: text,
    });
  });

  // on user leaving the group
  socket.on("leave", () => {
    // remove user
    const user = user_leave(socket.id);

    // if romm has other users send messge user left
    if (users) {
      io.to(user.room).emit("general_message", {
        username: "ChatHouse",
        time: moment().format("h:mm a"),
        text: `${user.username} has left`,
      });
    }
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
