import React from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();
const endpoint = process.env.REACT_APP_ENDPOINT;

const SocketContextProvider = ({ children }) => {
  const socket = io(endpoint);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
