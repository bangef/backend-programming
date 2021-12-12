// Import express
const express = require("express");
// Membuat object express
const app = express();

/**
 * Membuat routing.
 * Method get menerima 2 params.
 * Param 1 adalah endpoint.
 * Param 2 callback.
 * Callback menerima object req dan res
 */
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Mendefinisikan port.
app.listen(3000);
