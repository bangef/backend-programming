const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("server running ...");
});

app.use("/user", user);
