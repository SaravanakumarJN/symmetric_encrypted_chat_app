import React from "react";
import { useHistory } from "react-router";
import { SocketContext } from "../../context/SocketContext";
import styles from "./Home.module.css";

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const history = useHistory();
  const socket = React.useContext(SocketContext);

  const handleJoin = () => {
    if (username !== "" && room !== "") {
      // send join request through socket
      socket.emit("join_room", { username, room });

      // then redirect to chatroom
      history.push(`/chatroom/${username}/${room}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ChatHouse</h1>
      <input
        placeholder='Enter your username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder='Enter room name'
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export { Home };
