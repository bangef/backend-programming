const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.use((req, res, next) => {
  const date = new Date().toString();
  console.log(`Time: ${date}`);
  next();
});

router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", UserController.store);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;
