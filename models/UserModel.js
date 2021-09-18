const { nanoid } = require("nanoid");
const { users } = require("../data/user");

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
    const id = nanoid();
    const newUser = { id, ...body };
    users.push(newUser);
    resolve(newUser);
  });
};

exports.updateUser = (id, body) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id == id);
    const user = users.find((user) => user.id == id);

    const updatedUser = {
      id: id,
      name: body.name || user.name,
      email: body.email || user.email,
      address: body.address || user.address,
      phone: body.phone || user.phone,
    };

    users[index] = updatedUser;

    resolve(updatedUser);
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const filteredUser = users.filter((user) => user.id != id);
    resolve(filteredUser);
  });
};
