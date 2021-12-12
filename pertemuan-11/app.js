// Import express
const express = require("express");
// Membuat object express
const app = express();

// Menggunakan routing (router)
const router = require("./routes/api.js");
app.use(router);

// Mendefinisikan port.
app.listen(3000);
