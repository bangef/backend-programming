const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const { users } = require("../data/user");

router.use((req, res, next) => {
  const date = new Date().toString();
  console.log(`Time: ${date}`);
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id == id);

  if (user) {
    res.status(200).json({
      id: user.id,
      name: user.name,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
});

router.post("/", (req, res) => {
  const { name, email, address, phone } = req.body;
  const id = nanoid();

  const user = { id, name, email, address, phone };

  users.push(user);

  res.status(201).json({
    users,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;
  const index = users.findIndex((user) => user.id == id);

  if (index > -1) {
    const currentUser = users[index];
    const newData = {
      id: currentUser.id,
      name: name ? name : currentUser.name,
      email: email ? email : currentUser.email,
      address: address ? address : currentUser.address,
      phone: phone ? phone : currentUser.phone,
    };

    users[index] = { ...newData };

    res.status(200).json({ users });
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id == id);

  if (index > -1) {
    users.splice(index, 1);

    res.status(200).json({
      users,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
});

module.exports = router;
