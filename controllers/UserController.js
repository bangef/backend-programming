const UserModel = require("../models/UserModel");

exports.index = async (req, res) => {
  const users = await UserModel.getUsers();
  res.status(200).json({ users });
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getUser(id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
};

exports.store = async (req, res) => {
  const newUser = await UserModel.addUser(req.body);

  res.status(201).json(newUser);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getUser(id);

  if (user) {
    const user = await UserModel.updateUser(id, req.body);
    res.status(200).json(user);
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getUser(id);

  if (user) {
    const users = await UserModel.deleteUser(id);
    res.status(200).json({ users });
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
};
