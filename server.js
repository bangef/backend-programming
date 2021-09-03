const http = require("http");
const { nanoid } = require("nanoid");
const users = require("./data/user");

const port = 3000;

const getRequestData = (req) => {
  return new Promise((resolve) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
};

const requestListener = async (req, res) => {
  const { method, url } = req;

  if (url === "/" && method === "GET") {
    res.end("user api");
  }

  // jika url /user dan method get
  else if (url === "/user" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = JSON.stringify({ users });
    res.end(data);
  }

  // jika url /user dan id 1, dan method get
  else if (url.match(/\/user\/\d/) && method === "GET") {
    const id = url.split("/")[2];
    const user = users.find((user) => user.id == id);

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
  }

  // jika url /user, dan method post
  else if (url === "/user" && method === "POST") {
    const payloads = await getRequestData(req);
    const newUser = { ...payloads, id: nanoid() };
    users.push(newUser);
    const data = JSON.stringify({ users });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(data);
  }

  // jika url /user/1, dan method put
  else if (url.match(/\/user\/\d/) && method === "PUT") {
    const id = url.split("/")[2];
    const user = users.find((user) => user.id == id);

    if (user) {
      const payloads = await getRequestData(req);
      const userIndex = users.findIndex((user) => user.id == id);
      users[userIndex] = { ...user, ...payloads };

      res.writeHead(200, { "Content-Type": "application/json" });
      const data = JSON.stringify({ users });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const data = JSON.stringify({ status: "failed" });
      res.end(data);
    }
  }

  // jika url /user/1, dan method delete
  else if (url.match(/\/user\/\d/) && method === "DELETE") {
    const id = url.split("/")[2];
    const user = users.find((user) => user.id == id);

    if (user) {
      const userFiltered = users.filter((user) => user.id != id);
      const data = JSON.stringify(userFiltered);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const data = JSON.stringify({
        status: "failed",
      });
      res.end(data);
    }
  }

  // selain itu tampilkan not found
  else {
    const data = JSON.stringify({ status: "failed" });
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(data);
  }
};

const server = http.createServer(requestListener);

server.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
