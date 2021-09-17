exports.getRequestData = (req) => {
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
