// Import express
const express = require("express");

// Membuat object router
const router = express.Router();

/**
 * Membuat routing.
 * Method get menerima 2 params.
 * Param 1 adalah endpoint.
 * Param 2 callback.
 * Callback menerima object req dan res
 */
router.get("/", (req, res) => {
  res.send("Hello Express");
});

router.get("/students", (req, res) => {
  res.send("Menampilkan semua students");
});

router.post("/students", (req, res) => {
  res.send("Menambahkan data student");
});

router.put("/students/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Mengedit student id ${id}`);
});

router.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Menghapus student id ${id}`);
});

// Export router
module.exports = router;
