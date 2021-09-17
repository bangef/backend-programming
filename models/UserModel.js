const { nanoid } = require("nanoid");
const users = require("../data/user");

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

exports.getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id == id);
    resolve(user);
  });
};

exports.addUser = (body) => {
  return new Promise((resolve, reject) => {
    const user = { id: nanoid(), ...body };
    users.push(user);
    resolve(user);
  });
};

exports.updateUser = (id, body) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id == id);
    const user = users.find((user) => user.id == id);

    const userUpdated = {
      id: user.id,
      name: body.name || user.name,
      address: body.address || user.address,
    };

    users[index] = userUpdated;

    resolve(userUpdated);
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const userFiltered = users.filter((user) => user.id != id);
    resolve(userFiltered);
  });
};
