import React from "react";
import { Switch, Route } from "react-router-dom";
import { ChatRoom } from "../components/chatroom/ChatRoom";
import { Home } from "../components/home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/chatroom/:username/:room'>
        <ChatRoom />
      </Route>
    </Switch>
  );
};

export { Routes };
