const { getRequestData } = require("../utils");
const UserModel = require("../models/UserModel");

exports.index = async (req, res) => {
  try {
    const users = await UserModel.getUsers();
    const data = JSON.stringify({ users });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res, id) => {
  try {
    const user = await UserModel.getUser(id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      const data = JSON.stringify(user);
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const data = JSON.stringify({
        status: "failed",
      });
      res.end(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.store = async (req, res) => {
  try {
    const body = await getRequestData(req);
    const user = await UserModel.addUser(body);

    const data = JSON.stringify(user);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(data);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, id) => {
  try {
    const user = UserModel.getUser(id);

    if (user) {
      const body = await getRequestData(req);
      const user = await UserModel.updateUser(id, body);

      const data = JSON.stringify(user);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const data = JSON.stringify({ status: "failed" });
      res.end(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = async (req, res, id) => {
  try {
    const user = await UserModel.getUser(id);

    if (user) {
      const users = await UserModel.deleteUser(id);
      const data = JSON.stringify(users);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const data = JSON.stringify({
        status: "failed",
      });
      res.end(data);
    }
  } catch (error) {
    console.log(error);
  }
};
