const http = require("http");
const UserController = require("./controllers/UserController");

const port = 3000;

const requestListener = async (req, res) => {
  const { method, url } = req;

  if (url === "/" && method === "GET") {
    res.end("user api");
  } else if (url === "/users" && method === "GET") {
    UserController.index(req, res);
  } else if (url.match(/\/users\/\d/) && method === "GET") {
    const id = url.split("/")[2];
    UserController.show(req, res, id);
  } else if (url === "/users" && method === "POST") {
    UserController.store(req, res);
  } else if (url.match(/\/users\/\d/) && method === "PUT") {
    const id = url.split("/")[2];

    UserController.update(req, res, id);
  } else if (url.match(/\/users\/\d/) && method === "DELETE") {
    const id = url.split("/")[2];

    UserController.destroy(req, res, id);
  } else {
    const data = JSON.stringify({ status: "failed" });
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(data);
  }
};

const server = http.createServer(requestListener);

server.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
