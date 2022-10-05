const users = [];

const user_join = (id, username, room) => {
  const user = {
    id,
    username,
    room,
  };
  users.push(user);
  return user;
};

const get_user = (id) => {
  const user = users.filter((user) => user.id === id);

  return user;
};

const user_leave = (id) => {
  const user = users.filter((user) => user.id === id);

  return user;
};

module.exports = {
  user_join,
  user_leave,
  get_user,
};
